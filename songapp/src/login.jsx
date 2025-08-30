import React, { useState } from "react";
import "./login.css";

export default function Login({ onLogin }) {
  const [role, setRole] = useState("user");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (role === "admin") {
      if ( password === "admin123") {
        onLogin("admin", username);
      } else {
        alert("Invalid admin credentials");
      }
    } else {
      if (!username.trim()) {
        alert("Please enter your name");
      } else {
        onLogin("user", username);
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Welcome Back!</h2>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <input
          type="text"
          placeholder={role === "admin" ? "Admin Username" : "Your Name"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {role === "admin" && (
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}
        <button onClick={handleSubmit}>Login</button>
        <p>
          {role === "admin"
            ? "password: admin123"
            : "Just enter your name to login as user"}
        </p>
      </div>
    </div>
  );
}
