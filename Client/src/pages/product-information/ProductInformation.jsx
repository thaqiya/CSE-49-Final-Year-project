import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./ProductInformation.css";
import Navbar from "../../components/navbar/Navbar";


const ProductInformation = () => {
  const [scanResult, setScanResult] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 350,
        height: 350,
      },
      fps: 5,
    });

    scanner.render(success, error);

    function success(result) {
      scanner.clear();
      setScanResult(result);
    }

    function error(err) {
      console.warn(err);
    }

    // Cleanup on component unmount
    return () => {
      scanner.clear();
    };
  }, []);

  useEffect(() => {
    if (scanResult) {
      // When a barcode is scanned, fetch the product details
      fetchProductDetails(scanResult);
    }
  }, [scanResult]);

  const fetchProductDetails = async (barcode) => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await fetch(
        `http://localhost:5001/api/materials/barcode/${barcode}`
      );
      if (response.ok) {
        const data = await response.json();
        setProductDetails(data);
      } else {
        setProductDetails(null);
        setErrorMessage("Product not found.");
      }
    } catch (err) {
      console.error("Error fetching product details:", err);
      setErrorMessage("There was an error retrieving the product information.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="product-info-container">
        <h1>Product Information</h1>
        {loading && <p>Loading product details...</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {productDetails ? (
          <div>
            <h3>Product Details:</h3>
            <p>
              <strong>Name:</strong> {productDetails.name}
            </p>
            <p>
              <strong>Quantity:</strong> {productDetails.quantity}
            </p>
            <p>
              <strong>Barcode Number:</strong> {productDetails.bar_code_number}
            </p>
            <p>
              <strong>Supplier ID:</strong> {productDetails.supplier_id}
            </p>
          </div>
        ) : (
          <div>
            <div id="reader"></div>
            <p>
              Please scan a barcode or QR code to retrieve the product
              information.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductInformation;
