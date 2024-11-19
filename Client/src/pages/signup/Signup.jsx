import React, { useState } from "react";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
  });

  const [message, setMessage] = useState(""); // State to store the message

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("User successfully registered!"); // Success message
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          address: "",
        });
      } else {
        setMessage(result.message || "Failed to create user."); // Error message
      }
    } catch (error) {
      setMessage("Error occurred while creating the user."); // Error handling
    }
  };

  return (
    <div className="signup-page">
      {/* Conditionally render the success/error message */}
      {message && <div className="message-box">{message}</div>}

      <form className="signup-form" onSubmit={handleSubmit}>
        <p className="sign-up-title">Sign Up Form</p>

        <div className="flex">
          <label>
            <input
              className="input"
              type="text"
              placeholder=""
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <span>Full Name</span>
          </label>

          <label>
            <input
              className="input"
              type="tel"
              placeholder=""
              minLength={10}
              value={formData.phone}
              onChange={handleChange}
              name="phone"
              required
            />
            <span>Phone Number</span>
          </label>
        </div>

        <label>
          <input
            className="input"
            type="text"
            placeholder=""
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <span>Address</span>
        </label>

        <label>
          <input
            className="input"
            type="email"
            placeholder=""
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <span>Email</span>
        </label>

        <label>
          <input
            className="input"
            type="password"
            placeholder=""
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span>Password</span>
        </label>

        <button className="submit">Submit</button>

        <p className="signin-exist">
          Already have an account? <a href="./login">Sign in</a>{" "}
        </p>
      </form>
    </div>
  );
};

export default Signup;
