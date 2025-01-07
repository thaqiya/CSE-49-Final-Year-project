import React from "react";
import "./SpecialFeature.css"; // Assuming styles are in a separate CSS file
import chatbot from '../../assets/images/chatbot-2.png';

const SpecialFeature = () => {
  return (
    <div className="offer">
      <div className="small-container">
        <div className="row">
          <div className="col-2">
            <img
              src={chatbot}
              className="offer-img"
              alt="Exclusive Product"
            />
          </div>
          <div className="col-2">
            <p>Contact our Chatbot</p>
            <h1>AI for rescue.</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reiciendis inventore quibusdam asperiores eum magnam dolor
              explicabo natus quod iste, labore voluptas officiis quae minima
              molestias esse ducimus nulla fugiat rerum.
            </p>
            <a href="/chatbot" className="btn">
              Connect Now &#8594;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialFeature;
