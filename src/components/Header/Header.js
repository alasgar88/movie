import React, { useState } from "react";
import { MenuComponent } from "../index";
import image from "../../assets/images/logo.png";
import "./header.scss";
import { Button, Drawer } from "antd";
import { MenuOutlined } from "../../assets/icons/icons";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <div className='header'>
      <div className='section-center menu-center'>
        <img
          src={image}
          alt='logo'
          className='logo'
          onClick={() => navigate("/")}
        />
        <div className='menu-container-top'>
          <MenuComponent />
        </div>

        <Button
          type='primary'
          onClick={showDrawer}
          className='menu-button-icon '
        >
          <MenuOutlined />
        </Button>
        <Drawer
          title='Menu'
          placement='right'
          onClose={onClose}
          visible={visible}
        >
          <div className='menu-container'>
            <MenuComponent mode='inline' />
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default Header;
