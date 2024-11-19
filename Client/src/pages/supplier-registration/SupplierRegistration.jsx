import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import './SupplierRegistration.css';

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
      const response = await fetch("http://localhost:5001/api/suppliers", {
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
    <div className="supplier-registration">
        <Navbar/>
      <h1>Supplier Registration</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Supplier Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={supplierDetails.name}
            onChange={handleChange}
            required
            placeholder="Enter supplier name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Supplier Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={supplierDetails.email}
            onChange={handleChange}
            required
            placeholder="Enter supplier email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Supplier Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={supplierDetails.phone}
            onChange={handleChange}
            required
            placeholder="Enter supplier phone"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Supplier Address</label>
          <textarea
            id="address"
            name="address"
            value={supplierDetails.address}
            onChange={handleChange}
            placeholder="Enter supplier address"
          />
        </div>
        <button type="submit">Register Supplier</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SupplierRegistration;
