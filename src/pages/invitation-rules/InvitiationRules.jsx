import React from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./InvitationRules.css";

const rules = [
  {
    id: "01",
    text: "There are 6 subordinate levels in inviting friends. If A invites B, then B is a level 1 subordinate of A. If B invites C, then C is a level 1 subordinate of B and a level 2 subordinate of A. If C invites D, then D is a level 1 subordinate of C, level 2 of B, and level 3 of A.",
  },
  {
    id: "02",
    text: "To make your friend your level 1 subordinate, they must register using your invitation link or enter your invitation code manually.",
  },
  {
    id: "03",
    text: "Once the invitee registers using your invitation code and completes a deposit, the commission will be received shortly thereafter.",
  },
  {
    id: "04",
    text: "Yesterday’s commission is calculated every morning at 01:00. Once complete, it is rewarded to your wallet and can be viewed in the collection record.",
  },
];

const InvitationRules = () => {
  const navigate = useNavigate();

  return (
    <div className="invitation-rules-container">
      {/* Header */}
      <div className="invitation-rules-header">
        <button
          className="invitation-rules-back-button"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={20} color="#fff" />
        </button>
        <h2 className="invitation-rules-title">Rules</h2>
        <div className="invitation-rules-placeholder" />
      </div>

      {/* Banner */}
      <div className="invitation-rules-banner">
        <p className="invitation-rules-highlight">【Promotion partner】program</p>
        <p className="invitation-rules-subtitle">
          This activity is valid for a long time
        </p>
      </div>

      {/* Rule Cards */}
      <div className="invitation-rules-list">
        {rules.map((rule) => (
          <div key={rule.id} className="invitation-rule-card">
            <div className="invitation-rule-id">{rule.id}</div>
            <div className="invitation-rule-underline" />
            <p className="invitation-rule-text">{rule.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvitationRules;
