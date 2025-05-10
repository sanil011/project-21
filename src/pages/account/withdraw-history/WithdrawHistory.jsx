import { useState, useEffect } from "react";
import { ChevronLeft } from 'lucide-react'; // Import ChevronLeft from Lucid Icons
import DatePickerModal from "../transactions/DatePickeModal"; // ✅ Fixed spelling
import BankTypePickerModal from "../deposit-history/BankTypePickerModal";
import TransactionCard from "../components/transaction-card/TransactionCard";
import noDataImg from "../assets/empty-folder.png";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

const withdrawTabs = ["All", "UPI", "BANK TRANSFER"];


function getYesterdayDate() {
  const today = new Date();
  today.setDate(today.getDate() - 1); // subtract 1 day

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

const WithdrawHistory = () => {
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isGameTypeModalOpen, setIsGameTypeModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("All");
  const [selectedGameType, setSelectedGameType] = useState("All");
  const [selectedDate, setSelectedDate] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {

        const response = await api.get("/gamma/lucky9/getTransactionHistory")

        if (response.status !== 200) {
          throw new Error("Failed to fetch transactions");
        }

        const data = response.data;

        const withdrawalsOnly = data.filter(
          (txn) => txn.transactionType === "WITHDRAW"
        );

        setTransactions(withdrawalsOnly);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      console.log("sanil", selectedDate);
      const selected = new Date(selectedDate).toDateString();

      const filtered = transactions.filter((t) => {
        const txnDate = new Date(t.transactionDateTime).toDateString();
        const matchesDate = txnDate === selected;

        const matchesState =
          selectedGameType === "All" ||
          t.rechargeState?.toLowerCase() === selectedGameType.toLowerCase();

        return matchesDate && matchesState;
      });

      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  }, [selectedDate, selectedGameType, transactions]);

  return (
    <div className="game-history-container">
      {/* Header */}
      <div className="game-history-header">
        <button className="game-history-back-button" onClick={handleBack}>
          <ChevronLeft /> {/* Using ChevronLeft from Lucid Icons */}
        </button>
        <h2 className="game-history-title">Withdraw history</h2>
      </div>

      {/* Tabs */}
      <div className="game-history-tabs-scroll">
        <div className="game-history-tabs">
          {withdrawTabs.map((tab) => (
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

      {/* Filter Buttons */}
      <div className="game-history-filters">
        <button
          className="game-history-filter-btn"
          onClick={() => setIsGameTypeModalOpen(true)}
        >
          {selectedGameType} ▼
        </button>
        <button
          className="game-history-filter-btn"
          onClick={() => setIsDateModalOpen(true)}
        >
          {selectedDate
            ? new Date(selectedDate).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
            : "Choose a date ▼"}
        </button>
      </div>

      {/* Data Display */}
      {selectedDate ? (
        filteredData.length > 0 ? (
          <div className="game-history-list">
            {filteredData.map((txn, index) => (
              <TransactionCard key={index} txn={txn} />
            ))}
          </div>
        ) : (
          <div className="game-history-no-data">
            <img src={noDataImg} alt="No data" />
            <p>No data for selected date</p>
          </div>
        )
      ) : (
          <div className="game-history-list">
            {transactions.map((txn, index) => {
              if (index > 10) return;
              return<TransactionCard key={index} txn={txn} />
            })}
          </div>
      )}

      {/* Modals */}
      <DatePickerModal
        isOpen={isDateModalOpen}
        onClose={() => setIsDateModalOpen(false)}
        onDateSelect={(date) => {
          setSelectedDate(date);
          setIsDateModalOpen(false);
        }}
      />
      <BankTypePickerModal
        isOpen={isGameTypeModalOpen}
        onClose={() => setIsGameTypeModalOpen(false)}
        gameType={selectedTab}
        selectedOption={selectedGameType}
        onSelect={(val) => setSelectedGameType(val)}
      />
    </div>
  );
};

export default WithdrawHistory;
