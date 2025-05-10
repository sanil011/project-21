import "./Wallet.css";
import { useSelector } from "react-redux";
// Import PNG icons
import walletIcon from "../assets/recharge-btn.png";
import depositIcon from "../assets/recharge-btn.png";
import withdrawIcon from "../assets/withdraw-btn.png";
import depositHistoryIcon from "../assets/rechargeHistory-btn.png";
import withdrawHistoryIcon from "../assets/withdrawHistory-btn.png";
import { NavLink } from "react-router-dom"; // Import NavLink

const Wallet = () => {
  const { id, balance } = useSelector(store => store.userData); // userData

  return (
    <div className="wallet-container">
      
      {/* Wallet Header */}
      <div className="wallet-header">
        {/* <button className="back-button">←</button> */}
        <h2 className="wallet-title">Wallet</h2>
        <img src={walletIcon} alt="Wallet" className="wallet-page-icon" />
        <p className="wallet-balance">₹{balance.toFixed(2)}</p>
        <span className="wallet-total-balance">Total balance</span>
      </div>

      {/* Wallet body */}
      <div className="wallet-body">
        
        {/* Wallet Details Section */}
        <div className="wallet-details">
          <div className="wallet-box">
            <div
              className="wallet-progress-circle"
              style={{ "--progress": "0%" }}
              data-progress="0%"
            >
            </div>
            <p className="wallet-amount">₹0.00</p>
            <span className="wallet-label">Main wallet</span>
          </div>
          <div className="wallet-box">
            <div
              className="wallet-progress-circle"
              style={{ "--progress": "60%" }}
              data-progress="60%"
            >
            </div>
            <p className="wallet-amount">₹0.00</p>
            <span className="wallet-label">3rd party wallet</span>
          </div>
        </div>

        {/* Transfer Button */}
        <button className="wallet-transfer-btn">Main wallet transfer</button>

        {/* Action Buttons */}
        <div className="wallet-actions">
          <div className="wallet-action">
            <NavLink to={`/account/${id}/deposit`}>
              <img src={depositIcon} alt="Deposit" className="wallet-action-icon" />
              <span>Deposit</span>
            </NavLink>
          </div>
          <div className="wallet-action">
            <NavLink to={`/account/${id}/withdraw`}>
              <img src={withdrawIcon} alt="Withdraw" className="wallet-action-icon" />
              <span>Withdraw</span>
            </NavLink>
          </div>
          <div className="wallet-action">
            <NavLink to={`/account/${id}/deposit-history`}>
              <img src={depositHistoryIcon} alt="Deposit History" className="wallet-action-icon" />
              <span>Deposit history</span>
            </NavLink>
          </div>
          <div className="wallet-action">
            <NavLink to={`/account/${id}/withdraw-history`}>
              <img src={withdrawHistoryIcon} alt="Withdrawal History" className="wallet-action-icon" />
              <span>Withdrawal history</span>
            </NavLink>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Wallet;
