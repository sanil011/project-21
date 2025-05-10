import React, { useState } from "react";
import {
  ChevronRight,
  BarChart,
  DollarSign,
  ScrollText,
  Headphones,
  UserPlus,
  Users,
  BarChartBig,
  ClipboardCopy,
  ClipboardList,
  Check,
} from "lucide-react";
import PromotionInfoLink from "../account/components/PromotionInfoLink";
import "./Promotion.css";

const Promotion = () => {
  // ====== State Variables ======
  const [yesterdayCommission, setYesterdayCommission] = useState(0);

  const [directRegisterCount, setDirectRegisterCount] = useState(0);
  const [directDepositCount, setDirectDepositCount] = useState(0);
  const [directDepositAmount, setDirectDepositAmount] = useState(0);
  const [directFirstDepositCount, setDirectFirstDepositCount] = useState(0);

  const [teamRegisterCount, setTeamRegisterCount] = useState(0);
  const [teamDepositCount, setTeamDepositCount] = useState(0);
  const [teamDepositAmount, setTeamDepositAmount] = useState(0);
  const [teamFirstDepositCount, setTeamFirstDepositCount] = useState(0);

  const [thisWeekCommission, setThisWeekCommission] = useState(0);
  const [totalCommission, setTotalCommission] = useState(0);
  const [totalDirectSubs, setTotalDirectSubs] = useState(0);
  const [totalTeamSubs, setTotalTeamSubs] = useState(0);

  const [inviteCode, setInviteCode] = useState("3818519190331");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="promotion-container">
      {/* ===== Title Section ===== */}
      <div className="promotion-page-title">
        <h2>Agency</h2>
      </div>

      {/* ===== Commission Info Section ===== */}
      <div className="promotion-commission-box">
        <p className="promotion-amount">{yesterdayCommission}</p>
        <p className="promotion-label">Yesterday’s total commission</p>
        <p className="promotion-tip">Upgrade the level to increase commission income</p>
      </div>

      {/* ===== Subordinate Boxes Section ===== */}
      <div className="promotion-subordinate-boxes">
        {/* Direct Subordinates */}
        <div className="promotion-sub-box">
          <div className="promotion-sub-box-header">
            <UserPlus size={20} className="promotion-sub-icon" />
            <span>Direct subordinates</span>
          </div>
          <div className="promotion-sub-box-content">
            <p><span className="promotion-number">{directRegisterCount}</span> number of register</p>
            <p><span className="promotion-number">{directDepositCount}</span> Deposit number</p>
            <p><span className="promotion-number">{directDepositAmount}</span> Deposit amount</p>
            <p><span className="promotion-number">{directFirstDepositCount}</span> Number of people making first deposit</p>
          </div>
        </div>

        {/* Team Subordinates */}
        <div className="promotion-sub-box">
          <div className="promotion-sub-box-header">
            <Users size={20} className="promotion-sub-icon" />
            <span>Team subordinates</span>
          </div>
          <div className="promotion-sub-box-content">
            <p><span className="promotion-number">{teamRegisterCount}</span> number of register</p>
            <p><span className="promotion-number">{teamDepositCount}</span> Deposit number</p>
            <p><span className="promotion-number">{teamDepositAmount}</span> Deposit amount</p>
            <p><span className="promotion-number">{teamFirstDepositCount}</span> Number of people making first deposit</p>
          </div>
        </div>
      </div>

      {/* ===== Invitation Link Button ===== */}
      <button className="promotion-invite-button">INVITATION LINK</button>

      {/* ===== Copy Code Section ===== */}
      <div className="promotion-copy-row">
        <span className="promotion-copy-label">
          <ClipboardList size={14} style={{ marginRight: 6 }} />
          Invitation Code
        </span>
        <div className="promotion-copy-box">
          <span className="promotion-code">{inviteCode}</span>
          <button className="promotion-copy-btn" onClick={handleCopy}>
            {copied ? <Check size={16} /> : <ClipboardCopy size={16} />}
          </button>
        </div>
      </div>

      {/* ===== Info Links ===== */}
      <PromotionInfoLink to="/promotion/subordinate" iconStart={BarChart} text="Subordinate data" iconEnd={ChevronRight} />
      <PromotionInfoLink to="/promotion/reward" iconStart={BarChart} text="Reward" iconEnd={ChevronRight} />
      <PromotionInfoLink to="/promotion/commission-detail" iconStart={DollarSign} text="Commission detail" iconEnd={ChevronRight} />
      <PromotionInfoLink to="/promotion/invitation-rules" iconStart={ScrollText} text="Invitation rules" iconEnd={ChevronRight} />
      <PromotionInfoLink to="/customer-service" iconStart={Headphones} text="Agent line customer service" iconEnd={ChevronRight} />

      {/* ===== Promotion Data Card ===== */}
      <div className="promotion-data-card">
        <div className="promotion-data-header">
          <BarChartBig size={20} className="promotion-data-icon" />
          <span>promotion data</span>
        </div>
        <div className="promotion-data-grid">
          <div className="promotion-data-item">
            <div className="promotion-data-number">{thisWeekCommission}</div>
            <div className="promotion-data-label">This Week</div>
          </div>
          <div className="promotion-data-item">
            <div className="promotion-data-number">{totalCommission}</div>
            <div className="promotion-data-label">Total commission</div>
          </div>
          <div className="promotion-data-item">
            <div className="promotion-data-number">{totalDirectSubs}</div>
            <div className="promotion-data-label">direct subordinate</div>
          </div>
          <div className="promotion-data-item">
            <div className="promotion-data-number">{totalTeamSubs}</div>
            <div className="promotion-data-label">Total number of subordinates in the team</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotion;
