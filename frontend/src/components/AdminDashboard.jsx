import { useState } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "../firebase";
import AdminDashboard from "./AdminDashboard";

const auth = getAuth(app);

export default function AdminLogin() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  auth.onAuthStateChanged((u) => setUser(u));

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert("❌ Login failed: " + err.message);
    }
  };

  if (!user) {
    return (
      <form onSubmit={handleLogin} className="mdl-grid" style={{ maxWidth: "400px" }}>
        <h3>🔐 Admin Login</h3>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
          Login
        </button>
      </form>
    );
  }

  return (
    <div>
      <button
        onClick={() => signOut(auth)}
        className="mdl-button mdl-js-button mdl-button--raised"
      >
        🚪 Logout
      </button>
      <AdminDashboard />
    </div>
  );
}
