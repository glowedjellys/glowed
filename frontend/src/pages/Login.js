import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (error) {
      setErr(error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {err && <p style={{ color: "red" }}>{err}</p>}
      <form onSubmit={handleSubmit}>
        <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" required />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <Link to="/register">No account? Register</Link>
    </div>
  );
}