import React, { useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import "./MissingPeople.css";
import { API } from "../../../../api";
import axios from "axios";
import { imgApi } from "../../../imgApi";

const RegisterMissingPeople = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    phone: "",
    address: "",
    height: "",
    weight: "",
    sex: "Male", // Default selection
    race: "",
    image_url: "",
  });
  const [imageFile, setImageFile] = useState(null);

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
      // Step 1: Upload image file to the backend and get the Google Drive link
      let fileId = "";
      let backendLink = "";
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const uploadResponse = await axios.post(
          `${imgApi}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        fileId = uploadResponse.data.fileId;
        // console.log(uploadResponse);
        backendLink = `http://localhost:5002/image/${fileId}`;
        console.log(backendLink);

        // Get the backendLink
      }

      // Step 2: Submit the form data with the backendLink
      const completeData = { ...formData, image_url: backendLink };
      const response = await fetch(`${API}/api/missing-people`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(completeData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      alert("Missing person added successfully");

      // Reset the form
      setFormData({
        name: "",
        description: "",
        phone: "",
        address: "",
        height: "",
        weight: "",
        sex: "Male",
        race: "",
        image_url: "",
      });
      setImageFile(null);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="missing-people-header">
      <div className="missing-people-container">
        <Navbar />
        <h1 className="missing-people-heading">Report Missing Person</h1>
        <form onSubmit={handleSubmit} className="missing-people-form">
          <div className="missing-people-form-row">
            <div className="missing-people-form-group">
              <label htmlFor="name" className="missing-people-label">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="product-field"
                placeholder="Name"
              />
            </div>
            <div className="missing-people-form-group">
              <label htmlFor="description" className="missing-people-label">
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="1"
                required
                className="product-field"
                placeholder="Description"
              ></textarea>
            </div>
          </div>
          <div className="missing-people-form-row">
            <div className="missing-people-form-group">
              <label htmlFor="phone" className="missing-people-label">
                Phone:
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="missing-people-field"
                placeholder="Phone no."
              />
            </div>
            <div className="missing-people-form-group">
              <label htmlFor="address" className="missing-people-label">
                Address:
              </label>
              <textarea
                id="address"
                rows={1}
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="missing-people-field"
                placeholder="Address"
              ></textarea>
            </div>
          </div>
          <div className="missing-people-form-row">
            <div className="missing-people-form-group">
              <label htmlFor="height" className="missing-people-label">
                Height (cm):
              </label>
              <input
                type="number"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="missing-people-field"
                placeholder="Height"
              />
            </div>
            <div className="missing-people-form-group">
              <label htmlFor="weight" className="missing-people-label">
                Weight (kg):
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="missing-people-field"
                placeholder="Weight"
              />
            </div>
          </div>

          <div className="missing-people-form-row">
            <div className="missing-people-form-group">
              <label htmlFor="race" className="missing-people-label">
                Race:
              </label>
              <input
                type="text"
                id="race"
                name="race"
                value={formData.race}
                onChange={handleChange}
                className="missing-people-field"
                placeholder="Race"
              />
            </div>
            <div className="missing-people-form-group full-width">
              <label htmlFor="image" className="missing-people-label">
                Upload Image:
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="missing-people-field"
              />
            </div>
          </div>
          <button type="submit" className="product-register-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterMissingPeople;
