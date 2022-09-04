import {
  LikeOutlined,
  VideoCameraFilled,
  ArrowRightOutlined,
  DeliveredProcedureOutlined,
} from "@ant-design/icons";
export const menuItems = [
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
    label: "",
    key: "suggest_me",
    icon: <LikeOutlined style={{ fontSize: "20px", marginRight: "-10px" }} />,
  },
  {
    // label: "Dashboard",
    key: "dashboard",
    icon: (
      <VideoCameraFilled style={{ fontSize: "20px", marginRight: "-10px" }} />
    ),
  },
];

export const menu = [
  "top_rated",
  "now_playing",
  "popular",
  "upcoming",
  "latest",
];
