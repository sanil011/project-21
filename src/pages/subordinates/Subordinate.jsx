import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import noDataImg from "../assets/empty-folder.png";
import "./Subordinate.css";

const Subordinate = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("today");

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="subordinate-container">
      {/* Header */}
      <div className="subordinate-header">
        <ChevronLeft
          size={20}
          className="subordinate-back-icon"
          onClick={handleBack}
        />
        <span className="subordinate-title">New subordinates</span>
      </div>

      {/* Tabs */}
      <div className="subordinate-tab-group">
        {["today", "yesterday", "month"].map((key) => (
          <button
            key={key}
            className={`subordinate-tab ${selectedTab === key ? "active" : ""}`}
            onClick={() => setSelectedTab(key)}
          >
            {key === "today" && "Today"}
            {key === "yesterday" && "Yesterday"}
            {key === "month" && "This month"}
          </button>
        ))}
      </div>

      {/* Empty State */}
      <div className="subordinate-empty">
        <img
          src={noDataImg}
          alt="No data"
          className="subordinate-empty-img"
        />
        <p className="subordinate-empty-text">No data</p>
      </div>
    </div>
  );
};

export default Subordinate;
