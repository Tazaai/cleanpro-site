import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "../firebase";
import AdminDashboard from "./AdminDashboard";

const auth = getAuth(app);

export default function AdminLogin() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert("❌ Login failed: " + err.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return (
      <form onSubmit={handleLogin} style={{ maxWidth: "300px" }}>
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
        <button>Login</button>
      </form>
    );
  }

  return (
    <div>
      <button onClick={() => signOut(auth)}>🚪 Logout</button>
      <AdminDashboard />
    </div>
  );
}
