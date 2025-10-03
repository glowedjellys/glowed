import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

// Securely allowlist permitted API endpoints to prevent SSRF
const ALLOWED_API_URLS = [
  "https://api.example.com",
  "https://dev-api.example.com",
  "http://localhost:4000"
];

function getSafeApiUrl(envUrl) {
  // Ensure URL matches an allowed base domain
  if (ALLOWED_API_URLS.includes(envUrl)) {
    return envUrl;
  }
  // Optionally: throw error or use default safe value
  // throw new Error("Invalid API URL configuration");
  return ALLOWED_API_URLS[0];
}

const API_URL = getSafeApiUrl(process.env.REACT_APP_API_URL);

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/users/register`, { username, password });
      navigate("/login");
    } catch (error) {
      setErr(error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {err && <p style={{ color: "red" }}>{err}</p>}
      <form onSubmit={handleSubmit}>
        <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" required />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
      <Link to="/login">Already have an account? Login</Link>
    </div>
  );
}