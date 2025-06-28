import React, { useState, useEffect } from "react";
import api from '../api';
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.body.style.background = "linear-gradient(to bottom right, #526d82, #7a8ba3)";
    return () => {
      document.body.style.background = "#f7f9fc";
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post("/api/auth/login", formData);
    const { user, token } = res.data;

    if (user && user._id && token) {
      localStorage.setItem("userId", user._id);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true");

      setMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/"), 1000);
    } else {
      setMessage("Login failed: Invalid user data received from server.");
    }
  } catch (err) {
    setMessage(err.response?.data?.message || "Something went wrong during login.");
  }
};


  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
          <small
  style={{
    display: "block",
    marginTop: "15px",
    padding: "12px 15px",
    background: "#f1f5f9",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    color: "#333",
    textAlign: "center",
    fontSize: "0.95rem",
    lineHeight: "1.5"
  }}
>
  👉 <strong>Demo Login:</strong> <br />
  Email: <strong>traveller@example.com</strong> <br />
  Password: <strong>traveller123</strong>
</small>

        </form>
        
      </div>
    </div>
  );
};

export default Login;