
import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(`${API_URL}/api/users/login`, {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (err) {
      setError("Login failed. Check your email and password.");
    }
  };

  return (
    <form className="form-card" onSubmit={handleLogin}>
      <h2>Login</h2>
      {error && <p style={{ color: "#ff6b6b", marginBottom: "10px" }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginPage;
