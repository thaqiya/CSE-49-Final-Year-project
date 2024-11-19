import React from "react";
import "./Brand.css";

const Brand = ({image}) => {
  return (
    <div className="col-5">
      <img src={image} />
    </div>
  );
};

export default Brand;
