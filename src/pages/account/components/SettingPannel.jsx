import React from "react";
import {
  Notifications,
  CardGiftcard,
  BarChart,
  Language,
  ChevronRight,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const settings = [
  {
    id: 1,
    icon: <Notifications sx={{ fontSize: 28, color: "#60a5fa" }} />,
    label: "Messages",
    value: "",
  },
  {
    id: 2,
    icon: <CardGiftcard sx={{ fontSize: 28, color: "#60a5fa" }} />,
    label: "Gifts",
    value: "",
  },
  {
    id: 3,
    icon: <BarChart sx={{ fontSize: 28, color: "#60a5fa" }} />,
    label: "Game statistics",
    value: "",
  },
  {
    id: 4,
    icon: <Language sx={{ fontSize: 28, color: "#60a5fa" }} />,
    label: "Language",
    value: "English",
  },
];

const SettingPannel = () => {
  const { id } = useSelector((store) => store.userData);

  return (
    <div className="bg-[#2b3270] rounded-xl mx-[20px]">
      {settings.map((item, index) => {
        const path = `/account/${id}/${item.label.toLowerCase().replace(/\s+/g, "-")}`;
        return (
          <NavLink to={path} key={item.id}>
            <div
              className={`flex items-center justify-between p-3 ${
                index !== settings.length - 1 ? "border-b border-[#3a4186]" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="text-white text-sm">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.value && (
                  <span className="text-white text-sm">{item.value}</span>
                )}
                <ChevronRight sx={{ fontSize: 20, color: "white" }} />
              </div>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};

export default SettingPannel;

