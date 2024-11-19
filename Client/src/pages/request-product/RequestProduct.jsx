import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";

const RequestProducts = () => {
  const [materials, setMaterials] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch materials from the server
  const fetchMaterials = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/materials");
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

  const handleRequestDelivery = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/materials/request/${id}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        const result = await response.json();
        setMessage(result.message);
      } else {
        setMessage("Error requesting delivery");
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  return (
    <div className="materials-list">
        <Navbar/>
      <h1>Materials List</h1>
      {message && <p>{message}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Barcode</th>
            <th>Supplier</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((material) => (
            <tr key={material.id}>
              <td>{material.name}</td>
              <td>{material.quantity}</td>
              <td>{material.bar_code_number}</td>
              <td>{material.supplier_name}</td>
              <td>
                <button onClick={() => handleRequestDelivery(material.id)}>
                  Request Delivery
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestProducts;
