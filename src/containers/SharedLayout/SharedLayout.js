import React from "react";
import { Header } from "../../components";
import "./shared-layout.scss";
import { Outlet } from "react-router-dom";

const SharedLayout = () => {
  return (
    <>
      <Header />
      <div className='main-container'>
        <div className='section-center section-center-main'>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default SharedLayout;
