import React from "react";
import { Banknote } from "lucide-react";
import "./BetHistoryCard.css";

const formatDateTimeString = (dateString) => {
  const date = new Date(dateString);

  return {
    datePart: date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    timePart: date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};

const getBetStatusColor = (status) => {
  switch (status?.toUpperCase()) {
    case "DEBIT":
      return "status-debit";
    case "CREDIT":
      return "status-credit";
    default:
      return "status-default";
  }
};

const BetHistoryCard = ({ bet }) => {
  const { datePart, timePart } = formatDateTimeString(bet.createdAt);

  const isDebit = bet.status?.toUpperCase() === "DEBIT";
  const isCredit = bet.status?.toUpperCase() === "CREDIT";

  return (
    <div className="bet-card-card">
      <div className="bet-card-icon">
        <Banknote size={20} />
      </div>

      <div className="bet-card-details">
        <div className="bet-card-top">
          <div className="bet-card-title">
            {bet.gameName?.charAt(0).toUpperCase() + bet.gameName?.slice(1)}
          </div>
          <div
            className={`bet-card-amount ${
              isDebit ? "amount-debit" : isCredit ? "amount-credit" : ""
            }`}
          >
            {isDebit ? "- " : isCredit ? "+ " : ""}
            ₹{bet.amount.toFixed(2)}
          </div>
        </div>

        <div className="bet-card-subtitle">Bet ID: {bet.id || "N/A"}</div>

        <div className="bet-card-bottom">
          <div className="bet-card-date">
            {datePart} · {timePart}
          </div>
          <div className={`bet-card-status ${getBetStatusColor(bet.status)}`}>
            {bet.status?.toLowerCase()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetHistoryCard;
