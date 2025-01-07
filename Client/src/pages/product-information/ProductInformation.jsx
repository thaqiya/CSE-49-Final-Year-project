import React, { useState, useEffect, useContext } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import Navbar from "../../components/navbar/Navbar";
import { API } from "../../../api";
import { useAuthContext } from "../../hooks/useAuthContext"; // Ensure correct import of useAuthContext
import "./ProductInformation.css";

const ProductInformation = () => {
  const [scanResult, setScanResult] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [scanType, setScanType] = useState("arrival");
  const [barcode, setBarcode] = useState("");

  const apiKey = "921f935335724b88a849f8bc1ed6ae76"; // Replace with your OpenCage API key
  const { user } = useAuthContext();
  console.log(user);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: { width: 300, height: 300 },
      fps: 5,
    });

    scanner.render(handleScanSuccess);

    function handleScanSuccess(result) {
      // Ensure the result is a valid barcode string
      if (typeof result === "string") {
        setScanResult(result); // Set the barcode directly
      } else if (result && result.text) {
        setScanResult(result.text); // Handle if result is an object with 'text' property
      }
    }

    // Get user's current location
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude.toFixed(8);
        const long = position.coords.longitude.toFixed(8);
        setLatitude(lat);
        setLongitude(long);
        await fetchUserAddress(lat, long);
      },
      (error) => console.error("Error fetching location:", error)
    );

    return () => {
      scanner.clear();
    };
  }, []);

  useEffect(() => {
    if (scanResult) {
      console.log("Scanned Barcode: ", scanResult); // Add debug log to check the barcode value
      fetchProductDetails(scanResult); // Fetch product details with barcode
    }
  }, [scanResult]);

  const fetchProductDetails = async (barcode) => {
    setLoading(true);
    setErrorMessage("");
    setBarcode(barcode); // Set the barcode in the state
    try {
      const response = await fetch(`${API}/api/materials/barcode/${barcode}`);
      if (response.ok) {
        const data = await response.json();
        setProductDetails(data);

        // Assuming the order ID is part of the product details
        // const orderId = data.order_id;
        updateOrderLocation( scanResult); // Update order location
        console.log(scanResult);
        
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

  const fetchUserAddress = async (lat, long) => {
    try {
      const url = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${lat},${long}&pretty=1&no_annotations=1`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setUserAddress(data.results[0]?.formatted || "Address not found");
      } else {
        setUserAddress("Unable to fetch address");
      }
    } catch (error) {
      console.error("Error fetching user address:", error);
      setUserAddress("Error retrieving address");
    }
  };

  const updateOrderLocation = async (barcode) => {
    console.log(user.id);
    console.log(latitude);
    console.log(longitude);
    console.log(scanType);
    console.log(barcode); 

    try {
      const requestBody = {
        user_id: user.id,
        latitude: latitude,
        longitude: longitude,
        scan_type: scanType,
        bar_code_number: barcode, // Use the barcode here
      };

      console.log("Request Body:", requestBody); // Log request body for debugging

      const response = await fetch(`${API}/api/orders/${barcode}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody), // Sending the dynamic request body
      });

      if (!response.ok) {
        throw new Error("Failed to update order location");
      }

      const updatedOrder = await response.json();
      console.log("Order updated successfully", updatedOrder);
    } catch (err) {
      console.error("Error updating order location:", err);
    }
  };

  return (
    <>
      <div className="product-info-container">
        <Navbar />
        <h1>Product Information</h1>
        {loading && <p>Loading product details...</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <div className="scan-type-selector">
          <label htmlFor="scanType">Select Scan Type:</label>
          <select
            id="scanType"
            value={scanType}
            onChange={(e) => setScanType(e.target.value)}
          >
            <option value="arrival">Arrival</option>
            <option value="departure">Departure</option>
          </select>
        </div>
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
            <p>
              <strong>Scan Type:</strong> {scanType}
            </p>
            {/* <p>
              <strong>Latitude:</strong> {latitude}
            </p>
            <p>
              <strong>Longitude:</strong> {longitude}
            </p> */}
            <p>
              <strong>Address:</strong> {userAddress}
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
