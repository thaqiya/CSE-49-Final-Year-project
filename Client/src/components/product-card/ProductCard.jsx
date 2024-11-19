import React from "react";
import "./ProductCard.css"; // Assuming CSS is in a separate file

const ProductCard = ({ heading, description, link }) => {
  return (
    <div className="product-card">
      <p className="heading">{heading}</p>
      <p className="para">{description}</p>
      <div className="overlay"></div>
      <button
        className="product-card-btn"
        onClick={() => (window.location.href = link)}
      >
        Click
      </button>
    </div>
  );
};

export default ProductCard;
