import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { menuItems } from "../../utils/menuItems";
import "./menu.scss";

const MenuComponent = ({ mode }) => {
  const [current, setCurrent] = useState("");
  const { category } = useParams();
  const navigate = useNavigate();
  const onClick = (e) => {
    setCurrent(e.key);
    const key = e.key === "top_rated" ? "" : e.key;
    navigate(`/${key}`);
  };

  useEffect(() => {
    const menuCategory = category ? category : "top_rated";
    setCurrent(menuCategory);
  }, [category]);

  return (
    <Menu
      onClick={onClick}
      defaultSelectedKeys={["top_rated"]}
      selectedKeys={current}
      mode={`${mode ? "inline" : "horizontal"}`}
      items={menuItems}
    />
  );
};

export default MenuComponent;
