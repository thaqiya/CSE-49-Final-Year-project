import React, { useState } from "react";
import "./Slider.css";
import doctorImage from "../../assets/images/doctors.jpg";
import deliveryImage from "../../assets/images/delivery.jpg";
import campImage from "../../assets/images/camp.png";
import trackImage from "../../assets/images/track.jpg";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";

const Slider = () => {
  const initialItems = [
    {
      title: "Instant Doctor Consultation",
      description:
        "Get immediate access to medical advice when you need it most. Our real-time chat feature connects you directly with certified doctors who can provide guidance, answer questions, and assist you through emergency situations. Whether you need help with first aid or have health concerns, our doctors are here to support you every step of the way.",
      backgroundImage: doctorImage,
    },
    {
      title: "Locate Nearby Relief Camps",
      description:
        "Quickly find the closest relief camps to access food, shelter, and medical assistance in times of crisis. Our location-based feature helps you navigate to safety by providing real-time updates on available camps and their resources. With just a few clicks, discover the support you need and make your way to a secure environment.",
      backgroundImage: campImage,
    },
    {
      title: "Item Tracking",
      description:
        "Stay informed on the status of essential relief items with our real-time tracking feature. Each dispatched item is equipped with a unique barcode, allowing you to monitor its journey from dispatch to delivery. Whether you're waiting for supplies or managing inventory, our tracking system ensures that you know exactly where critical resources are at all times.",
      backgroundImage: trackImage,
    },
    {
      title: "Relief Material Delivery",
      description:
        "Ensure that essential supplies reach those in need with our streamlined delivery system. Goonj coordinates the delivery of relief materials—such as food, water, medical kits, and clothing—directly to affected areas. With real-time updates and precise tracking, relief providers can swiftly respond to emergencies, ensuring vital resources are delivered to communities when they need them most.",
      backgroundImage: deliveryImage,
    },
  ];

  const [items, setItems] = useState(initialItems);

  const nextSlide = () => {
    setItems((prevItems) => [...prevItems.slice(1), prevItems[0]]);
  };

  const prevSlide = () => {
    setItems((prevItems) => [
      prevItems[prevItems.length - 1],
      ...prevItems.slice(0, -1),
    ]);
  };

  return (
    <main className="slider-container">
      <ul className="slider">
        {items.map((item, index) => (
          <li
            key={index}
            className="item"
            style={{ backgroundImage: `url(${item.backgroundImage})` }}
          >
            <div className="content">
              <h2 className="carousel-title">"{item.title}"</h2>
              <p className="description">{item.description}</p>
              <Link to="/payment">
                <button class="contribute-btn">Contribute Now</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <nav className="slider-arrows">
        <ArrowBackIosIcon
          className="material-symbols-outlined arrow-btn prev"
          onClick={prevSlide}
        />
        <ArrowForwardIosIcon
          className="material-symbols-outlined arrow-btn next"
          onClick={nextSlide}
        />
      </nav>
    </main>
  );
};

export default Slider;
