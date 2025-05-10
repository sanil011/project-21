import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DatePickerModal from "../transactions/DatePickeModal";
import GameTypePickerModal from "./GameTypePickerModal";
import BetHistoryCard from "../components/transaction-card/BetHistoryCard";
import noDataImg from "../assets/empty-folder.png";
import "./GameHistory.css";
import api from "../../../services/api";

const gameTabs = ["Lottery", "Casino", "Fishing", "Rummy", "Sports", "Originals", "Slots"];

function getYesterdayDate() {
  const today = new Date();
  today.setDate(today.getDate() - 1); // subtract 1 day

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}


const GameHistory = () => {
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isGameTypeModalOpen, setIsGameTypeModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Lottery");
  const [selectedGameType, setSelectedGameType] = useState("All");
  const [selectedDate, setSelectedDate] = useState(getYesterdayDate()); // ✅ Default to today
  const [transactions, setTransactions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBetHistory = async () => {
      try {

        const response = await api.get("/gamma/lucky9/userGameTransactions")

        if (response.status !== 200) throw new Error("Failed to fetch game transactions");

        const data = response.data;
        console.log("Fetched transactions:", data);

        const transformed = data
          .map((item) => {
            const [year, month, day, hour, minute, second, nanosecond] = item.createdAt;
            return {
              ...item,
              createdAt: new Date(year, month - 1, day, hour, minute, second, nanosecond / 1000000),
            };
          })
          .sort((a, b) => b.createdAt - a.createdAt); // ✅ Sort latest first

        setTransactions(transformed);
      } catch (error) {
        console.error("Error fetching game transactions:", error);
      }
    };

    fetchBetHistory();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const selected = new Date(selectedDate).toDateString();
      const filtered = transactions.filter(
        (item) => new Date(item.createdAt).toDateString() === selected
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  }, [selectedDate, transactions]);

  const handleBack = () => navigate(-1);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsDateModalOpen(false);
  };

  return (
    <div className="game-history-container">
      {/* Header */}
      <div className="game-history-header">
        <button className="game-history-back-button" onClick={handleBack}>
          <ChevronLeft />
        </button>
        <h2 className="game-history-title">Bet history</h2>
      </div>

      {/* Tabs */}
      <div className="game-history-tabs-scroll">
        <div className="game-history-tabs">
          {gameTabs.map((tab) => (
            <button
              key={tab}
              className={`game-history-tab ${selectedTab === tab ? "active" : ""}`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="game-history-filters">
        <button
          className="game-history-filter-btn"
          onClick={() => setIsGameTypeModalOpen(true)}
        >
          <span className="filter-label">{selectedGameType}</span>
          <ChevronDown size={20} className="chevron-icon" />
        </button>
        <button
          className="game-history-filter-btn"
          onClick={() => setIsDateModalOpen(true)}
        >
          <span className="filter-label">
            {selectedDate
              ? new Date(selectedDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
              : "Choose a date"}
          </span>
          <ChevronDown size={20} className="chevron-icon" />
        </button>
      </div>

      {/* Bet List */}
      <div className="game-history-list">
        {filteredData.length > 0 ? (
          filteredData.map((bet, index) => <BetHistoryCard key={index} bet={bet} />)
        ) : (
          <div className="game-history-no-data">
            <img src={noDataImg} alt="No data" />
            <p>No data for selected date</p>
          </div>
        )}
      </div>

      {/* Modals */}
      <DatePickerModal
        isOpen={isDateModalOpen}
        onClose={() => setIsDateModalOpen(false)}
        onDateSelect={handleDateSelect}
      />
      <GameTypePickerModal
        isOpen={isGameTypeModalOpen}
        onClose={() => setIsGameTypeModalOpen(false)}
        gameType={selectedTab}
        selectedOption={selectedGameType}
        onSelect={(val) => setSelectedGameType(val)}
      />
    </div>
  );
};

export default GameHistory;
