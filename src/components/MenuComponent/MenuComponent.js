import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { menuItems } from "../../utils/menuItems";
import "./menu.scss";
import { LikeOutlined, VideoCameraFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";

const MenuComponent = ({ mode }) => {
  // menu default list
  let menuItems = [
    {
      label: "Top Rated",
      key: "top_rated",
    },
    {
      label: "Now Playing",
      key: "now_playing",
    },
    {
      label: "Popular",
      key: "popular",
    },

    {
      label: "Upcoming",
      key: "upcoming",
    },
    {
      label: 0,
      key: "suggest_me",
      icon: <LikeOutlined style={{ fontSize: "20px", marginRight: "-10px" }} />,
    },
    {
      label: 0,
      key: "watch_list",
      icon: (
        <VideoCameraFilled style={{ fontSize: "20px", marginRight: "-10px" }} />
      ),
    },
  ];

  const { total } = useSelector((store) => store.category);
  menuItems = menuItems.map((item) => {
    if (item.key === "suggest_me") {
      return { ...item, label: total.suggest };
    }
    if (item.key === "watch_list") {
      return { ...item, label: total.watchList };
    }
    return { ...item };
  });

  // add suggest and watch count to menu list
  const [current, setCurrent] = useState("");
  const { category } = useParams();
  const navigate = useNavigate();
  const onClick = (e) => {
    setCurrent(e.key);
    let key =
      e.key === "top_rated"
        ? ""
        : e.key === "suggest_me"
        ? "list/suggest_me"
        : e.key === "watch_list"
        ? "list/watch_list"
        : e.key;

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
