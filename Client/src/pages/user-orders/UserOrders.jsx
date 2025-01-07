import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { API } from "../../../api";
import { useAuthContext } from "../../hooks/useAuthContext"; // Importing the AuthContext
import "./UserOrders.css";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState({});
  const { user } = useAuthContext(); // Getting user from context
  const apiKey = "921f935335724b88a849f8bc1ed6ae76"; // Replace with your OpenCage API key
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Fetch user orders
  const fetchUserOrders = async () => {
    if (!user?.id) {
      setMessage("You must be logged in to view your orders.");
      console.log("No user found:", user);
      return;
    }

    console.log(user);
    

    setLoading(true);
    try {
      const response = await fetch(`${API}/api/orders?user_id=${user.id}`);
      if (response.ok) {
        const result = await response.json();
        if (result.length > 0) {
          setOrders(result);
          await fetchAddresses(result); // Fetch addresses after orders are fetched
        } else {
          setMessage("You have not made any orders yet.");
        }
      } else {
        setMessage("Failed to fetch your orders. Please try again.");
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch address based on latitude and longitude
  const fetchAddress = async (latitude, longitude, orderId) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude},${longitude}&pretty=1&no_annotations=1`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const address = data.results[0]?.formatted || "Address not found";
      setAddresses((prev) => ({
        ...prev,
        [orderId]: address,
      }));
    } catch (err) {
      console.error("Error fetching address:", err);
    }
  };

  // Fetch addresses for all orders
  const fetchAddresses = async (orders) => {
    for (const order of orders) {
      const { latitude, longitude, id } = order;
      if (latitude && longitude) {
        await fetchAddress(latitude, longitude, id);
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserOrders(); // Fetch orders only if user is logged in
    }
  }, [user]); // Dependency array includes user to refetch on login change

  return (
    <div className="user-orders-container">
      <Navbar />
      <h1 className="user-orders-heading">My Orders</h1>
      {loading ? (
        <p>Loading your orders...</p>
      ) : message ? (
        <p className="message">{message}</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <h2>Order ID: {order.id}</h2>
              <h4>Status : {order.scan_type}</h4>
              <p>
                <strong>Material ID:</strong> {order.material_id}
              </p>
              <p>
                <strong>Bar Code:</strong> {order.bar_code_number}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(order.created_at).toLocaleString()}
              </p>
              {/* Displaying the address */}
              {addresses[order.id] ? (
                <p>
                  <strong>Address:</strong> {addresses[order.id]}
                </p>
              ) : (
                <p>Loading address...</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;
