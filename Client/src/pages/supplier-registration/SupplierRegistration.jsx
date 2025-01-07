import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import './SupplierRegistration.css';
import { API } from "../../../api";

const SupplierRegistration = () => {
  const [supplierDetails, setSupplierDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [message, setMessage] = useState("");

  // Handle input changes for supplier details
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplierDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sending the data to the server (POST request)
    try {
      const response = await fetch(`${API}/api/suppliers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(supplierDetails),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(`Supplier registered successfully! ID: ${result.id}`);
      } else {
        setMessage("Error: Could not register supplier");
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div className="supplier-header">
      <div className="supplier-container">
        <Navbar />
        <h1 className="supplier-registration-heading">Supplier Registration</h1>
        <form onSubmit={handleSubmit} className="supplier-form">
          <div className="supplier-form-group">
            <label htmlFor="name" className="supplier-label">
              Supplier Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={supplierDetails.name}
              onChange={handleChange}
              required
              placeholder="Name"
              className="supplier-field"
            />
          </div>
          <div className="supplier-form-group">
            <label htmlFor="email" className="supplier-label">
              Supplier Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={supplierDetails.email}
              onChange={handleChange}
              required
              placeholder="example@email.com"
              className="supplier-field"
            />
          </div>
          <div className="supplier-form-group">
            <label htmlFor="phone" className="supplier-label">
              Supplier Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={supplierDetails.phone}
              onChange={handleChange}
              required
              placeholder="Phone no."
              className="supplier-field"
            />
          </div>
          <div className="supplier-form-group">
            <label htmlFor="address" className="supplier-label">
              Supplier Address
            </label>
            <textarea
              id="address"
              name="address"
              value={supplierDetails.address}
              onChange={handleChange}
              placeholder="Address"
              className="supplier-field"
            />
          </div>
          <button type="submit" className="supplier-register-button">Register Supplier</button>
        </form>
        {message && <p className="supplier-error-message">{message}</p>}
      </div>
    </div>
  );
};

export default SupplierRegistration;
