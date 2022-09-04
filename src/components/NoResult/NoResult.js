import React from "react";
import image from "../../assets/images/error.png";
import "./no-result.scss";

const NotFound = () => {
  return (
    <div className='section-center'>
      <div className='no-result'>
        <img src={image} alt='' className='no-result-image' />
        <p className='no-result-title'>No results found</p>
      </div>
    </div>
  );
};

export default NotFound;
