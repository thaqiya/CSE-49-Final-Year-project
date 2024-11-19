import React from "react";
import './Categories.css';
import category1 from '../../assets/images/category-1.png';
import category2 from "../../assets/images/category-2.png";
import category3 from "../../assets/images/category-3.png";

const Categories = () => {
  return (
    <div className="categories">
      <div className="small-container">
        <div className="row">
          <div className="col-3">
            <img src={category1} alt="Category 1" />
          </div>
          <div className="col-3">
            <img src={category2} alt="Category 2" />
          </div>
          <div className="col-3">
            <img src={category3} alt="Category 3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
