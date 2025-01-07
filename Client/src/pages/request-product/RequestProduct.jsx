import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import { API } from "../../../api";
import "./RequestProduct.css";
import { useAuthContext } from "../../hooks/useAuthContext";

const RequestProducts = () => {
  const [materials, setMaterials] = useState([]);
  const [message, setMessage] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const { user } = useAuthContext();

  // Fetch user location
  const fetchUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        setMessage("Error fetching location: " + error.message);
      }
    );
  };

  useEffect(() => {
    fetchUserLocation();
  }, []);

  // Fetch materials from the server
  const fetchMaterials = async () => {
    try {
      const response = await fetch(`${API}/api/materials`);
      if (response.ok) {
        const result = await response.json();
        setMaterials(result);
      } else {
        setMessage("Error fetching materials");
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  // Handle request button click
  const handleRequest = async (material) => {
    if (!latitude || !longitude) {
      setMessage("Location not available. Please enable location services.");
      return;
    }

    const requestData = {
      material_id: material.id,
      scan_type: "arrival",
      latitude,
      longitude,
      bar_code_number: material.bar_code_number,
      user_id: user?.id, // Assuming user ID is part of the auth context
    };

    try {
      const response = await fetch(`${API}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setMessage(`Successfully requested material: ${material.name}`);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div className="request-material-header">
      <div className="request-materials-container">
        <Navbar />
        <h1 className="request-material-heading">Materials List</h1>
        {message && <p className="message">{message}</p>}
        <div className="request-card-container">
          {materials.map((material) => (
            <div className="request-material-card" key={material.id}>
              <img
                src={material.image_url}
                alt={material.name}
                className="request-material-image"
              />
              <div className="request-material-details">
                <h2>{material.name}</h2>
              </div>
              <button
                className="request-btn"
                onClick={() => handleRequest(material)}
              >
                <span className="request-btn-visible">Request</span>
                <span className="request-btn-invisible">
                  Available
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequestProducts;
