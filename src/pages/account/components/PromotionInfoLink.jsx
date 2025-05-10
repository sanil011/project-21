import React from "react";
import { NavLink } from "react-router-dom";
import "./PromotionInfoLink.css";

const PromotionInfoLink = ({ iconStart: IconStart, text, iconEnd: IconEnd, to }) => {
  return (
    <NavLink to={to} className="promotion-info-link" style={{ textDecoration: "none", color: "inherit" }}>
      <span className="promotion-link-text">
        {IconStart && <IconStart size={16} className="promotion-icon-start" />}
        {text}
      </span>
      {IconEnd && <IconEnd size={16} className="promotion-icon-end promotion-arrow" />}
    </NavLink>
  );
};

export default PromotionInfoLink;

