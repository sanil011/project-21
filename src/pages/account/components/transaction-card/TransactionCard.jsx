import React from "react";
import { Banknote, ArrowDownToLine } from "lucide-react";
import "./TransactionCard.css";

const formatDateTime = (dateTimeStr) => {
  const date = new Date(dateTimeStr);
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

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "approved":
      return "status-completed";
    case "requested":
      return "status-requested";
    case "blocked":
      return "status-cancelled";
    default:
      return "status-default";
  }
};
const getStatusText = (status) => {
  switch (status?.toLowerCase()) {
    case "approved":
      return "Success";  // Changed to human-readable status
    case "requested":
      return "Pending";   // Changed to "Pending"
    case "blocked":
      return "Rejected";  // Changed to "Rejected"
    default:
      return "Pending";   // Default case for any unknown status
  }
};


const TransactionCard = ({ txn }) => {
  const { datePart, timePart } = formatDateTime(txn.transactionDateTime);
  const isWithdraw = txn.transactionType === "WITHDRAW";

  return (
    <div className="transaction-card">
      <div className="transaction-icon">
        {isWithdraw ? (
          <ArrowDownToLine size={20} />
        ) : (
          <Banknote size={20} />
        )}
      </div>

      <div className="transaction-details">
        
        <div className="transaction-top">
          <div className="transaction-title">
            {isWithdraw ? "Withdraw" : "Deposit"}
          </div>
          <div className="transaction-amount">₹ {txn.amount.toFixed(2)}</div>
        </div>

        <div className="transaction-subtitle">
          Transaction ID: {txn.transactionId || "1234567890"}
        </div>

        <div className="transaction-bottom">
          <div className="transaction-date">
            {datePart} · {timePart}
          </div>
          <div className={`transaction-status ${getStatusColor(txn.rechargeState)}`}>
            {getStatusText(txn.rechargeState)}
          </div>
        </div>

        {txn?.rechargeState == 'Blocked' && <div className="">
          <h1 className="text-xs text-red-400">Don't have sufficient balance.</h1>
        </div>}

      </div>
    </div>
  );
};

export default TransactionCard;
