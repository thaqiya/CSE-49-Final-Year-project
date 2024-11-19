import React, { useState } from "react";
import "./Navbar.css"; // Import the CSS file for styling
import goonjLogo from '../../assets/logo/goonj.svg';
import cartImg from '../../assets/images/cart.png';
import menuImg from "../../assets/images/menu.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle logout
  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");

    // Redirect to the login page
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="logo">
          <img src={goonjLogo} alt="logo" width="150px" />
        </div>
        <nav>
          <ul
            id="MenuItems"
            style={{ maxHeight: isMenuOpen ? "200px" : "0px" }}
          >
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/products">Products</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/" onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </nav>
        <img src={cartImg} className="cart-icon" alt="cart" width="30px" height="30px" />
        <img
          src={menuImg}
          className="menu-icon"
          onClick={toggleMenu}
          alt="menu"
          width="30px"
          height="30px"
        />
      </div>
    </div>
  );
};

export default Navbar;
