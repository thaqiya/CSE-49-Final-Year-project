import React, { useState, useRef } from "react";
import Barcode from "react-barcode";
import { toPng } from "html-to-image";
import Navbar from "../../components/navbar/Navbar";
import "./RegisterProduct.css";

const RegisterProduct = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    code: "",
    quantity: "",
    supplier_id: "",
  });

  const barcodeRef = useRef(null);

  // Handle input changes for product details
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Submit product details to the database
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      name: productDetails.name,
      quantity: parseInt(productDetails.quantity, 10), // Ensure quantity is an integer
      bar_code_number: productDetails.code,
      supplier_id: productDetails.supplier_id
        ? parseInt(productDetails.supplier_id, 10)
        : null,
    };

    try {
      const response = await fetch("http://localhost:5001/api/materials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Product registered successfully!");
        console.log("Registered Material:", result);
        setProductDetails({
          name: "",
          code: "",
          quantity: "",
          supplier_id: "",
        });
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert("Failed to register product: " + errorData.message);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred while registering the product.");
    }
  };

  return (
    <div className="register-product-page">
      <Navbar />
      <div className="container">
        <h1>Register Product</h1>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={productDetails.name}
              onChange={handleChange}
              required
              placeholder="Enter product name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="code">Product Code</label>
            <input
              type="text"
              id="code"
              name="code"
              value={productDetails.code}
              onChange={handleChange}
              required
              placeholder="Enter product code"
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={productDetails.quantity}
              onChange={handleChange}
              required
              placeholder="Enter product quantity"
              min="1"
            />
          </div>
          <div className="form-group">
            <label htmlFor="supplier_id">Supplier ID</label>
            <input
              type="number"
              id="supplier_id"
              name="supplier_id"
              value={productDetails.supplier_id}
              onChange={handleChange}
              placeholder="Enter supplier ID (optional)"
              min="1"
            />
          </div>
          <button type="submit">Register Product</button>
        </form>

        <div className="barcode-section">
          <h2>Barcode Generation</h2>
          {productDetails.code ? (
            <div ref={barcodeRef} className="barcode">
              <Barcode value={productDetails.code} fontSize={1} />
            </div>
          ) : (
            <p>Please enter a product code to generate a barcode.</p>
          )}
          {productDetails.code && (
            <a
              href={URL.createObjectURL(
                new Blob([productDetails.code], { type: "image/png" })
              )}
              download={`${productDetails.code || "barcode"}.png`}
            >
              <button>Download Barcode</button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterProduct;
