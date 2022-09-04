import React from "react";
import "./error.scss";
import { Button } from "antd";
import image from "../../assets/images/error.png";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className='section-center'>
      <div className='error'>
        <img src={image} alt='' className='error-image' />
        <p className='title-error'>Lost your way</p>
        <p className='title-text'>
          Oops!This is awkward.You are looking for something that doesn't
          actually exist
        </p>
        <Button type='primary' className='button' onClick={() => navigate("/")}>
          Go Home
        </Button>
      </div>
    </div>
  );
};

export default Error;
