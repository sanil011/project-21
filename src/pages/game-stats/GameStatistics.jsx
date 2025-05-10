import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowBackIosNewRounded,
  CasinoRounded,
  LiveTvRounded,
  SportsEsportsRounded,
  EmojiNatureRounded,
  EmojiEventsRounded,
  PsychologyRounded,
} from "@mui/icons-material";
import "./GameStatistics.css";

const filters = ["Today", "Yesterday", "This week", "This month"];

const statsData = [
  { name: "lottery", icon: <CasinoRounded className="game-statistics-icon" /> },
  { name: "video", icon: <LiveTvRounded className="game-statistics-icon" /> },
  { name: "slot", icon: <SportsEsportsRounded className="game-statistics-icon" /> },
  { name: "fish", icon: <EmojiNatureRounded className="game-statistics-icon" /> },
  { name: "sport", icon: <EmojiEventsRounded className="game-statistics-icon" /> },
  { name: "chess card", icon: <PsychologyRounded className="game-statistics-icon" /> },
];

const GameStatistics = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("Today");

  return (
    <div className="game-statistics-container">
      {/* Header */}
      <div className="transaction-header">
        <button onClick={() => navigate(-1)}>
          <ArrowBackIosNewRounded className="text-white w-5 h-5" />
        </button>
        <div className="flex-1 text-center text-white font-medium">
          Game statistics
        </div>
        <div className="w-5 h-5" />
      </div>

      {/* Filter Buttons */}
      <div className="game-statistics-filters">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`game-statistics-filter-btn ${
              activeFilter === filter ? "active" : ""
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Total Bet Summary */}
      <div className="game-statistics-summary">
        <p className="game-statistics-amount">₹0.00</p>
        <p className="game-statistics-summary-label">Total bet</p>
      </div>

      {/* Game Stats List */}
      <div className="game-statistics-list">
        {statsData.map((item, index) => (
          <div key={index} className="game-statistics-card">
            <div className="game-statistics-card-header">
              {item.icon}
              <span className="game-statistics-card-title">{item.name}</span>
            </div>
            <ul className="game-statistics-details">
              <li>
                <div className="game-statistics-dot" />
                <span>Total bet</span>
                <span>₹0.00</span>
              </li>
              <li>
                <div className="game-statistics-dot" />
                <span>Number of bets</span>
                <span>0</span>
              </li>
              <li>
                <div className="game-statistics-dot" />
                <span>Winning amount</span>
                <span className="game-statistics-winning-amount">₹0.00</span>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameStatistics;
