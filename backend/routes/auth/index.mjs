// =============================================================
// 🔐 CleanPro Authentication API - JWT Auth System
// =============================================================

import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDb } from "../../firebase.js";
import { validate } from "../../middleware/validation.js";
import { registerSchema, loginSchema, passwordUpdateSchema, profileUpdateSchema } from "../../schemas/auth.js";

const router = express.Router();

// JWT Secret (should be in environment variable)
const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

// Password hash rounds
const SALT_ROUNDS = 12;

// =============================================================
// 🔧 Helper Functions
// =============================================================

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      role: user.role || "customer" 
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

// Validate JWT token middleware
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ 
      ok: false, 
      error: "Access denied. No token provided." 
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ 
      ok: false, 
      error: "Invalid token." 
    });
  }
};

// Admin role middleware
export const requireAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ 
      ok: false, 
      error: "Admin access required." 
    });
  }
  next();
};

// =============================================================
// 🔐 Authentication Routes
// =============================================================

// Register new user
router.post("/register", validate(registerSchema), async (req, res) => {
  try {
    const { email, password, firstName, lastName, role = 'user' } = req.validated;
    const db = getDb();

    // Check if user already exists
    const usersRef = db.collection("users");
    const existingUser = await usersRef.where("email", "==", email).get();
    
    if (!existingUser.empty) {
      return res.status(409).json({ 
        ok: false, 
        error: "User with this email already exists" 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user document
    const userData = {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone: phone || null,
      role: "customer",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true,
      emailVerified: false
    };

    const userDoc = await usersRef.add(userData);
    
    // Generate token
    const user = { id: userDoc.id, email, role: "customer" };
    const token = generateToken(user);

    res.status(201).json({
      ok: true,
      message: "User registered successfully",
      user: {
        id: userDoc.id,
        email,
        firstName,
        lastName,
        phone,
        role: "customer"
      },
      token
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ 
      ok: false, 
      error: "Internal server error during registration" 
    });
  }
});

// Login user
router.post("/login", validate(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.validated;
    const db = getDb();

    // Find user by email
    const usersRef = db.collection("users");
    const userQuery = await usersRef.where("email", "==", email).get();
    
    if (userQuery.empty) {
      return res.status(401).json({ 
        ok: false, 
        error: "Invalid email or password" 
      });
    }

    const userDoc = userQuery.docs[0];
    const userData = userDoc.data();

    // Check if user is active
    if (!userData.isActive) {
      return res.status(401).json({ 
        ok: false, 
        error: "Account is deactivated" 
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, userData.password);
    if (!isValidPassword) {
      return res.status(401).json({ 
        ok: false, 
        error: "Invalid email or password" 
      });
    }

    // Update last login
    await userDoc.ref.update({ 
      lastLogin: new Date().toISOString() 
    });

    // Generate token
    const user = { 
      id: userDoc.id, 
      email: userData.email, 
      role: userData.role || "customer" 
    };
    const token = generateToken(user);

    res.json({
      ok: true,
      message: "Login successful",
      user: {
        id: userDoc.id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        role: userData.role || "customer"
      },
      token
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      ok: false, 
      error: "Internal server error during login" 
    });
  }
});

// Get current user profile
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const db = getDb();
    const userDoc = await db.collection("users").doc(req.user.id).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ 
        ok: false, 
        error: "User not found" 
      });
    }

    const userData = userDoc.data();
    
    res.json({
      ok: true,
      user: {
        id: userDoc.id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        role: userData.role || "customer",
        createdAt: userData.createdAt,
        emailVerified: userData.emailVerified || false
      }
    });

  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ 
      ok: false, 
      error: "Internal server error" 
    });
  }
});

// Update user profile
router.put("/profile", authenticateToken, validate(profileUpdateSchema), async (req, res) => {
  try {
    const updates = req.validated;
    const db = getDb();

    // Update user document
    const updateData = {
      updatedAt: new Date().toISOString()
    };

    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (phone !== undefined) updateData.phone = phone;

    await db.collection("users").doc(req.user.id).update(updateData);

    res.json({
      ok: true,
      message: "Profile updated successfully"
    });

  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ 
      ok: false, 
      error: "Internal server error" 
    });
  }
});

// Change password
router.post("/change-password", authenticateToken, validate(passwordUpdateSchema), async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.validated;
    const db = getDb();

    // Get current user
    const userDoc = await db.collection("users").doc(req.user.id).get();
    if (!userDoc.exists) {
      return res.status(404).json({ 
        ok: false, 
        error: "User not found" 
      });
    }

    const userData = userDoc.data();

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, userData.password);
    if (!isValidPassword) {
      return res.status(401).json({ 
        ok: false, 
        error: "Current password is incorrect" 
      });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

    // Update password
    await userDoc.ref.update({
      password: hashedNewPassword,
      updatedAt: new Date().toISOString()
    });

    res.json({
      ok: true,
      message: "Password changed successfully"
    });

  } catch (error) {
    console.error("Password change error:", error);
    res.status(500).json({ 
      ok: false, 
      error: "Internal server error" 
    });
  }
});

// Logout (client-side token removal, but we can log it)
router.post("/logout", authenticateToken, async (req, res) => {
  try {
    // In a more advanced setup, you might want to blacklist the token
    // For now, we'll just log the logout
    console.log(`User ${req.user.id} logged out at ${new Date().toISOString()}`);
    
    res.json({
      ok: true,
      message: "Logged out successfully"
    });

  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ 
      ok: false, 
      error: "Internal server error" 
    });
  }
});

export default router;