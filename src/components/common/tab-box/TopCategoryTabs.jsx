import React from "react";
import {
  tabImageEight,
  tabImageFive,
  tabImageFour,
  tabImageOne,
  tabImageSeven,
  tabImageThree,
  tabImageTwo,
} from "../../../images";
import "./TopCategoryTabs.css";

const tabs = [
  { label: "Popular", icon: tabImageOne },
  { label: "Lottery", icon: tabImageTwo },
  { label: "Jilli", icon: tabImageSeven },
  { label: "Virtual", icon: tabImageThree },
  { label: "Slots", icon: tabImageFour },
  { label: "Fishing", icon: tabImageSeven },
  { label: "Sports", icon: tabImageFive },
  { label: "Originals", icon: tabImageEight },
];

const TopCategoryTabs = ({ currentTab, changeTab }) => {
  return (
    <div className="top-tabs-wrapper">
      <div className="top-tabs-container">
        {tabs.map((tab) => (
          <div
            key={tab.label}
            className={`top-tab-item ${currentTab === tab.label ? "active-tab" : ""}`}
            onClick={() => changeTab(tab.label)}
          >
            <img src={tab.icon} alt={tab.label} className="top-tab-icon" />
            <span className="top-tab-label">{tab.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCategoryTabs;
