import React, { useState } from "react";
import axios from "axios";
import "./Payment.css"; // Reusing the DonationForm.css for styling
import { API } from "../../../api";

const Payment = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = {
      name,
      mobile,
      amount,
      MUID: "MUIDW" + Date.now(),
      transactionId: "T" + Date.now(),
    };

    try {
      const response = await axios.post(
        `${API}/api/payment/order`,
        data
      );
      const redirectUrl =
        response?.data?.data?.instrumentResponse?.redirectInfo?.url;
      if (redirectUrl) {
        window.location.replace(redirectUrl); // Redirect without adding to history
      } else {
        setError("Failed to initiate payment. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="donation-page">
      <div className="card-form">
        <form onSubmit={handleSubmit} className="deposit">
          <div className="form-indicator">Donate</div>
          <div className="form-body">
            <div className="row">
              <input
                type="text"
                name="Name"
                id="Name"
                required
                placeholder="Enter your Name"
                className="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="row">
              <input
                type="text"
                name="Mobile"
                id="Mobile"
                required
                placeholder="Enter your mobile number"
                className="mobile"
                onChange={(e) => setMobile(e.target.value)}
                value={mobile}
              />
            </div>
            <div className="row">
              <input
                type="text"
                name="Amount"
                id="Amount"
                required
                placeholder="₹0.00"
                className="amount"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
              />
            </div>
            {error && <div className="error-message">{error}</div>}
          </div>
          <div className="form-footer">
            <button type="submit" className="donation-btn" disabled={loading}>
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;
