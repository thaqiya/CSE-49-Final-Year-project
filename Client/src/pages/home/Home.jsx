import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import goonjHome from "../../assets/images/goonj-home.png";
import Footer from "../footer/Footer";
import Categories from "../../components/categories/Categories";
import ProductCard from "../../components/product-card/ProductCard";
import SpecialFeature from "../../components/special-feature/SpecialFeature";
import Brand from "../../components/brand/Brand";
import reg1 from "../../assets/images/reg-1.png";
import reg2 from "../../assets/images/reg-2.png";
import reg3 from "../../assets/images/reg-3.png";
import reg4 from "../../assets/images/reg-4.png";
import reg5 from "../../assets/images/reg-5.png";
// import { useAuthContext } from "../../hooks/useAuthContext";

const Home = () => {


  return (
    <div className="home-page">
      <div className="home-header">
        <div className="home-container">
          <Navbar />
          <div className="row">
            <div className="col-2">
              <h1>
                Dil Ki Suno, <br /> Goonj.. Karo
              </h1>
              <p>
                Join the Festival of Giving, DAAN UTSAV 2024! Together, let's
                bridge the gaps and spread happiness through simple acts of
                giving.
              </p>
              <a href="/relief-location" className="btn">
                Check Nearby Relief camps &#8594;
              </a>
            </div>
            <div className="col-2">
              <img
                src={goonjHome}
                alt="Workout Style"
                className="goonj-home-img"
              />
            </div>
          </div>
        </div>
        <Categories />
        <div className="small-container">
          <h2 className="title">Products</h2>
          <div className="row">
            <div className="col-4">
              <ProductCard
                heading="Supplier Registration"
                description="Register as a supplier..."
                link="/supplier-registration"
              />
            </div>
            <div className="col-4">
              <ProductCard
                heading="Register Product"
                description="Register new products here..."
                link="/register-product"
              />
            </div>
            <div className="col-4">
              <ProductCard
                heading="Request Products"
                description="We help deliver when you need"
                link="/request-product"
              />
            </div>
            <div className="col-4">
              <ProductCard
                heading="Product Information"
                description="Scan barcode and check..."
                link="/product-information"
              />
            </div>
            <div className="col-4">
              <ProductCard
                heading="Orders"
                description="Check where your material is..."
                link="/location-product"
              />
            </div>
          </div>
        </div>

        <div className="small-container">
          <h2 className="title">Missing people</h2>
          <div className="row">
            <div className="col-4">
              <ProductCard
                heading="Register Missing People"
                description="Find the ones you lost..."
                link="/register-missing-people"
              />
            </div>
            <div className="col-4">
              <ProductCard
                heading="View missing people"
                description="View the missing people..."
                link="/display-missing-people"
              />
            </div>
          </div>
        </div>

        <SpecialFeature />

        <div className="brands">
          <h2 className="title">Recognition</h2>
          <div className="small-container">
            <div className="row">
              <Brand image={reg1} />
              <Brand image={reg2} />
              <Brand image={reg3} />
              <Brand image={reg4} />
              <Brand image={reg5} />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Home;
