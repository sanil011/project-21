import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronDown } from "lucide-react";

import DatePickerModal from "./DatePickeModal";
import TransactionCard from "../components/transaction-card/TransactionCard";
import noDataImg from "../assets/empty-folder.png";
import "./Transaction.css";
import api from "../../../services/api";

const Transaction = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get("/gamma/lucky9/getTransactionHistory"); // Use axios.get

        if (response.status !== 200) {
          throw new Error("Failed to fetch transactions");
        }

        const data = response.data; // Get the response data
        console.log(data.data);
        setTransactions(data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching transactions:", error); // Handle error
      }
    };

    fetchTransactions();
  }, []); // Empty dependency array to run only once


  useEffect(() => {
    if (selectedDate) {
      const selectedDay = new Date(selectedDate).toISOString().split("T")[0]; // "2025-04-18"
  
      const filtered = transactions.filter((t) => {
        const txnDay = new Date(t.transactionDateTime).toISOString().split("T")[0];
        return txnDay === selectedDay;
      });
  
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  }, [selectedDate, transactions]);
  
  const handleBack = () => navigate(-1);

  return (
    <div className="transaction-container">
      {/* Header */}
      <div className="transaction-header">
        <button className="back-button" onClick={handleBack}>
          <ChevronLeft size={24} />
        </button>
        <h2 className="transaction-title">Transaction history</h2>
      </div>

      {/* Filters */}
      <div className="transaction-filters">
        <button className="filter-btn" onClick={() => setIsModalOpen(true)}>
          <span>
            {selectedDate
              ? new Date(selectedDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
              : "Choose a date"}
          </span>
          <ChevronDown size={18} />
        </button>
      </div>

      {/* Transaction List */}
      {selectedDate ? (
        filteredData.length > 0 ? (
          <div className="transaction-list">
            {filteredData.map((txn, index) => (
              <TransactionCard key={index} txn={txn} />
            ))}
          </div>
        ) : (
          <div className="no-data">
            <img src={noDataImg} alt="No transactions" />
            <p>No data for selected date</p>
          </div>
        )
      ) : (
          <div className="game-history-list">
            {transactions.map((txn, index) => {
              if (index > 10) return;
              return <TransactionCard key={index} txn={txn} />
            })}
          </div>
      )}

      {/* Date Picker Modal */}
      <DatePickerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDateSelect={(date) => {
          setSelectedDate(date);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default Transaction;
