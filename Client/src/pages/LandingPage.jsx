import React from "react";
// import LandingBG from "../assets/images/bg4.jpg";
import "./LandingPage.css";
import Logo from "../assets/logo/goonj.svg";
import Slider from "../components/carousel/Slider";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="landing-page-header">
        <nav className="landing-page-nav container">
          <a href="#" className="goonj-logo">
            <img src={Logo} alt="logo" />
          </a>

          <div className="landing-page-nav-button">
            <Link to="/login">
              <button class="landing-page-login">
                <span>Login</span>
              </button>
            </Link>

            <Link to="/signup">
              <button className="landing-page-sign-up">
                <span>Register</span>
              </button>
            </Link>
          </div>
        </nav>
      </header>
      {/* <div className="landing-page-body"> */}
      <Slider />
      {/* </div> */}
    </div>
  );
};

export default LandingPage;
