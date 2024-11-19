import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Login.css"; // Add your custom CSS for styling

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle login submission
  const handleLogin = async () => {
    setMessage(""); // Clear previous messages

    try {
      const response = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Store the token in localStorage
        localStorage.setItem("token", result.token);

        setMessage("Login successful!");

        // Redirect to the home page
        navigate("/home");
      } else {
        setMessage(result.message || "Login failed.");
      }
    } catch (error) {
      setMessage("Error occurred during login.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="card">
          <h1 className="sign-up-title">Login</h1>
          <div className="inputBox">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className="user">Email</span>
          </div>
          <div className="inputBox">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span>Password</span>
          </div>
          <button onClick={handleLogin} className="login">
            Login
          </button>
          {/* Message for login success/failure */}
          {message && <p className="login-message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
