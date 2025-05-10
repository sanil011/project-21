import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Wallet,
  Banknote,
  KeyRound,
  Building2,
  UserCog2,
  Link2,
  Gift,
  Gamepad2,
  Send,
  Globe,
} from "lucide-react";
import PromotionInfoLink from "../account/components/PromotionInfoLink";
import "./CustomerService.css";
import bannerImg from "../assets/customer-banner.png"; // Make sure this path is valid

const serviceList = [
  { icon: Wallet, label: "Deposit Not Receive" },
  { icon: Banknote, label: "Withdrawal problem" },
  { icon: Building2, label: "IFSC Modification" },
  { icon: KeyRound, label: "Change ID Login Password" },
  { icon: UserCog2, label: "Change bank name" },
  { icon: UserCog2, label: "Modify Bank Information" },
  { icon: Link2, label: "Add USDT Address" },
  { icon: Gift, label: "Activity Bonus" },
  { icon: Gamepad2, label: "Game Problems" },
  { icon: Send, label: "[Play-247] Official Channel" },
  { icon: Globe, label: "Check Play-247 Official Website" },
];

const CustomerService = () => {
  const navigate = useNavigate();

  return (
    <div className="customer-support-container">
      {/* Header */}
      <div className="customer-support-header">
        <button
          className="customer-support-back-button"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={20} color="#fff" />
        </button>
        <h2 className="customer-support-title">Customer Service</h2>
      </div>

      {/* Banner */}
      <div className="customer-support-banner">
        <img src={bannerImg} alt="Customer Support Banner" />
      </div>

      {/* Self Service Options */}
      <div className="customer-support-section">
        <h3 className="customer-support-section-title">Self Service</h3>
        <div className="customer-support-card-list">
          {serviceList.map((item, index) => (
            <PromotionInfoLink
              key={index}
              iconStart={item.icon}
              text={item.label}
              iconEnd={ChevronRight}
              to="#"
            />
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="customer-support-tips">
        <p>
          1. Please select the corresponding question and submit it for review.
          After successful submission, the customer service specialist will
          handle it for you within 10 minutes. Please wait patiently.
        </p>
        <p>
          2. 15 minutes after submitting for review, you can use [Progress
          Query] to view the review results of the work order you submitted.
        </p>
      </div>

      {/* Progress Query Button */}
      <div className="customer-support-progress-btn-wrapper">
        <button className="customer-support-progress-btn">
          Progress query
        </button>
      </div>
    </div>
  );
};

export default CustomerService;
