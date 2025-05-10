import React, { useState } from "react";
import DatePickerModal from "../account/transactions/DatePickeModal";
import { ChevronLeft,ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./CommissionDetails.css";

const CommissionDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("2025-04-06");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="commission-container">
      {/* Header */}
      <div className="commission-header">
        <button className="commission-back-button" onClick={handleBack}>
          <ChevronLeft size={20} color="#fff" />
        </button>
        <h2 className="commission-title">Commission Details</h2>
      </div>

        {/* Date Filter */}
        <div className="commission-filters">
        <button
            className="commission-date-btn"
            onClick={() => setIsModalOpen(true)}
        >
            <span>{selectedDate}</span>
            <ChevronDown size={16} />
        </button>
        </div>

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

export default CommissionDetails;
