import React, { useState, useEffect } from "react";
import Barcode from "react-barcode"; // Import the react-barcode library
import "./RegisterProduct.css";
import { API } from "../../../api";
import Navbar from "../../components/navbar/Navbar";
import { imgApi } from "../../imgApi";

const RegisterProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    bar_code_number: "",
    supplier_id: "",
    image_url: "",
  });

  const [imageFile, setImageFile] = useState(null);

  // Function to generate a random barcode number
  const generateBarcodeNumber = () => {
    const randomNumbers = Math.random().toString().slice(2, 6); // Generate 4 random numbers
    const randomLetters = Array.from({ length: 4 }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ).join(""); // Generate 4 random letters (A-Z)
    return `${randomNumbers}${randomLetters}`; // Combine numbers and letters
  };

  // Automatically generate a barcode number when the component loads
  useEffect(() => {
    const newBarcode = generateBarcodeNumber();
    setFormData((prevFormData) => ({
      ...prevFormData,
      bar_code_number: newBarcode,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let backendLink = "";

      // Step 1: Upload the image to the backend and get the image link
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append("file", imageFile);

        const uploadResponse = await fetch(`${imgApi}/upload`, {
          method: "POST",
          body: imageFormData,
        });

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload image");
        }

        const uploadData = await uploadResponse.json();
        const fileId = uploadData.fileId;
        backendLink = `${imgApi}/image/${fileId}`;
        console.log("Image uploaded successfully:", backendLink);
      }

      // Step 2: Register the product with the uploaded image URL
      const completeData = { ...formData, image_url: backendLink };

      const response = await fetch(`${API}/api/materials`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(completeData),
      });

      const responseData = await response.json();

      if (response.ok) {
        alert(responseData.message || "Product registered successfully!");

        // Reset the form and regenerate the barcode
        setFormData({
          name: "",
          quantity: "",
          bar_code_number: generateBarcodeNumber(), // Generate a new barcode for the next product
          supplier_id: "",
          image_url: "",
        });
        setImageFile(null);
      } else {
        throw new Error(responseData.message || "Failed to register product");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="product-header">
      <div className="product-container">
        <Navbar />
        <h1 className="product-registration-heading">Register Product</h1>
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-row">
            <div className="product-form-group">
              <label htmlFor="name" className="product-label">
                Product Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="product-field"
              />
            </div>
            <div className="product-form-group">
              <label htmlFor="quantity" className="product-label">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="product-field"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="product-form-group">
              <label htmlFor="bar_code_number" className="product-label">
                Bar Code Number:
              </label>
              <input
                type="text"
                id="bar_code_number"
                name="bar_code_number"
                value={formData.bar_code_number}
                onChange={handleChange}
                required
                className="product-field"
                readOnly // Make the field read-only
              />
            </div>
            <div className="product-form-group">
              <label htmlFor="supplier_id" className="product-label">
                Supplier ID:
              </label>
              <input
                type="number"
                id="supplier_id"
                name="supplier_id"
                value={formData.supplier_id}
                onChange={handleChange}
                required
                className="product-field"
              />
            </div>
          </div>
          <div className="product-form-group">
            <label htmlFor="image" className="product-label">
              Upload Image:
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="product-field"
            />
          </div>
          {/* Dynamically Display the Barcode */}
          {formData.bar_code_number && (
            <div className="barcode-container">
              <label className="barcode-label">Generated Barcode:</label>
              <div className="barcode-preview">
                <Barcode value={formData.bar_code_number} />
              </div>
            </div>
          )}
          <button type="submit" className="product-register-button">
            Register Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterProduct;
