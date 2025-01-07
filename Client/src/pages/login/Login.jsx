import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Login.css"; // Add your custom CSS for styling
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate
  const { login, error, isLoading } = useLogin();

  // Function to handle login submission
  // const handleLogin = async () => {
  //   setMessage(""); // Clear previous messages

  //   try {
  //     const response = await fetch("http://localhost:5001/api/users/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     const result = await response.json();

  //     if (response.ok) {
  //       // Store the token in localStorage
  //       localStorage.setItem("token", result.token);

  //       setMessage("Login successful!");

  //       // Redirect to the home page
  //       navigate("/home");
  //     } else {
  //       setMessage(result.message || "Login failed.");
  //     }
  //   } catch (error) {
  //     setMessage("Error occurred during login.");
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();

    await login(email, password);
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
          {error && <div className="error">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Login;
