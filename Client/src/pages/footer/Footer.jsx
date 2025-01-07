import React from "react";
import "./Footer.css"; // Import CSS for styling
import appStore from '../../assets/images/app-store.png';
import playStore from "../../assets/images/play-store.png";
import goonjLogo from "../../assets/logo/goonj-logo-white.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col-1">
            <h3>Download Our App</h3>
            <p>Download App from Google Playstore</p>
            <div className="app-logo">
              <img src={playStore} alt="Play Store" />
              <img src={appStore} alt="App Store" />
            </div>
          </div>

          <div className="footer-col-2">
            <img src={goonjLogo} alt="Logo" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
              modi provident necessitatibus porro illo voluptatibus odit
              suscipit temporibus facilis. Esse!
            </p>
          </div>

          <div className="footer-col-3">
            <h3>Useful Links</h3>
            <ul>
              <li>Coupons</li>
              <li>Blog Post</li>
              <li>Return Policy</li>
              <li>Join Affiliate</li>
            </ul>
          </div>

          <div className="footer-col-4">
            <h3>Follow us</h3>
            <ul>
              <li>Instagram</li>
              <li>Facebook</li>
              <li>LinkedIn</li>
              <li>
                <a
                  href="https://www.youtube.com/@Goonj99"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="copyright">
          ©2024 Goonj Foundation. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
