import  { useState,useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate hook
import { ChevronLeft } from 'lucide-react'; // Import ChevronLeft from Lucid Icons
import { useDispatch, useSelector } from "react-redux";
import walletIcon from '../assets/wallet-icon.png';
import refreshBtn from '../assets/refresh-btn.png';
import bankIcon from '../assets/withdraw-bank.png';
import paytmIcon from '../assets/witdraw-bank-hover.png';
import upiIcon from '../assets/upi.png';
import "./WithdrawPage.css";
import api from "../../../services/api";
import { alertActions } from "../../../store";
// Navigate back to previous page using react-router
// The navigate(-1) function is provided by react-router-dom
// It allows navigation through browser history, where -1 means "go back one page"
// Similar to clicking the browser's back button









const Withdraw = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name, id, balance } = useSelector(store => store.userData); // userData
  const [selectedMethod, setSelectedMethod] = useState("ACCOUNT");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawAmountError, setWithdrawAmountError] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for API calls
  const [showPopup, setShowPopup] = useState(false);

  const withdrawalMethods = [
    { name: "ACCOUNT", bonus: "+3", icon: bankIcon },
    { name: "Paytm Wallet", bonus: "+1%", icon: paytmIcon },
    { name: "UPI", bonus: "+1%", icon: upiIcon },
  ];

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
  };

  const fetchBankDetails = async () => {
    try {
      // Retrieve JWT token from localStorage
      const storedData = localStorage.getItem("lucky-game-user");
      if (!storedData) {
        alert("User not authenticated. Please log in.");
        return;
      }

      const response = await api.get("/gamma/lucky9/getBankAccount")
      const data = response.data;
      console.log(data);
      return data; // Returns { accountNo, upiId }

    } catch (error) {
      console.error("Error fetching bank details:", error);
    }
  };

  const showAlert = () => {
    dispatch(
      alertActions.showAlert({
        show: true,
        message:"Request submit",
        severity:"success",
      })
    );
    setTimeout(() => {
      dispatch(alertActions.showAlert());
      navigate(-1);
    }, 2000);
  };



  const handleWithdraw = async () => {
    setWithdrawAmountError(false);
  
    if (!withdrawAmount) {
      setWithdrawAmountError(true);
      return;
    }
  
    setLoading(true);
  
    const accountDetails = await fetchBankDetails();
    if (!accountDetails) {
      setLoading(false);
      return;
    }
  
    // Determine receivingId based on selectedMethod
    const receivingId =
      selectedMethod === "UPI" ? accountDetails.upiId : accountDetails.accountNo;
  
    // If receivingId is null or empty, show popup and navigate to add-bank-account
    if (!receivingId || receivingId.trim() === "") {
      setShowPopup(true);
      setLoading(false);
      return;
    }
  
    const payload = {
      receivingId: receivingId,
      amount: withdrawAmount,
      withdrawAccountType: selectedMethod,
    };
  
    console.log("🔍 Final Payload:", JSON.stringify(payload));
  
    try {
      // Retrieve JWT token from localStorage
      const storedData = localStorage.getItem("lucky-game-user");
      if (!storedData) {
        alert("User not authenticated. Please log in.");
        return;
      }
  
      const token = JSON.parse(storedData).token;  // Assuming token is stored this way
  
      // Use POST request to submit the withdraw request with payload
      const response = await api.post('/gamma/lucky9/withdrawRequest', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("🔍 HTTP Status Code:", response.status);
      if (response.status !== 200) {
        console.error("❌ API Error:", response.status, response.statusText);
        alert(`Error: ${response.status} ${response.statusText}`);
        return;
      }
  
      // Handle the response directly
      const result = response.data;  // Axios automatically parses JSON
      console.log("✅ Withdraw Response:", result);
      showAlert();
    } catch (error) {
      console.error("❌ Error processing withdrawal:", error);
      alert("An error occurred while processing your withdrawal.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleBack = () => {
    navigate(-1);
  };

  // just checking the state is changng or not
  useEffect(() => {
    console.log("Popup state changed:", showPopup);
  }, [showPopup]);
  
  useEffect(() => {
    console.log("Loading state changed:", loading);
  }, [loading]);
console.log("sanil error")
  return (
    <div className="withdraw-container">
      {/* Header */}
      <div className="header">
        <button className="back-button" onClick={handleBack}><ChevronLeft /></button>
        <h2 className="header-title">Withdraw</h2>
        <Link to={`/account/${id}/withdraw-history`} className="history-text text-blue-500">
          Withdraw history
        </Link>
      </div>

      {/* Balance Section */}
      <div className="balance-section">
        <div className="balance-left">
          <div className="balance-info">
            <div className="balance-title">
              <img src={walletIcon} alt="Wallet" className="wallet-icon" />
              <p className="balance-text">Available Balance</p>
            </div>
            <div className="balance-amount-container">
              <h3 className="balance-amount">₹{balance.toFixed(2)}</h3>
              <button className="refresh-button">
                <img src={refreshBtn} alt="Refresh" className="refresh-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Withdrawal Methods */}
      <div className="withdrawal-options">
        {withdrawalMethods.map((method, index) => (
          <div
            key={index}
            className={`withdrawal-card ${selectedMethod === method.name ? "active" : ""}`}
            onClick={() => handleMethodChange(method.name)}
          >
            <img src={method.icon} alt={method.name} className="withdrawal-icon" />
            <span>{method.name}</span>
            {method.bonus && <div className="bonus-badge">{method.bonus}</div>}
          </div>
        ))}
      </div>

      {/* Withdrawal Form for Bank Transfer & UPI */}
      {(selectedMethod === "ACCOUNT" || selectedMethod === "UPI") && (
        <>
          <div className="withdraw-form">
            <div className="input-wrapper">
              <input
                key="withdraw-input"
                id='withdraw-amount-input'
                type="number"
                className="input-box"
                value={withdrawAmount}
                onChange={(e) => { console.log("sanil",e); setWithdrawAmount(e.target.value)}}
                placeholder="Please enter the amount"
              />
            </div>

            <div className="amount-info">
              <p className="balance-info-text">
                Withdrawable balance: <span className="highlight">₹0.00</span>
              </p>
              <button className="all-btn">All</button>
            </div>

            <p className="received-amount">
              Withdrawal amount received: <span className="highlight">₹0.00</span>
            </p>

            <button className="withdraw-button" onClick={handleWithdraw} disabled={loading}>
              {loading ? "Processing..." : "Withdraw"}
            </button>

            {/* Withdrawal Rules */}
            <div className="withdrawal-rules">
              <p>Need to bet <span className="highlight">₹0.00</span> to be able to withdraw</p>
              <p>Withdraw time <span className="highlight">00:00 - 23:59</span></p>
              <p>Inday Remaining Withdrawal Times <span className="highlight red">3</span></p>
              <p>Withdrawal amount range <span className="highlight">₹110.00 - ₹10,000,000.00</span></p>
              <p>Please confirm your beneficiary account information before withdrawing. If your information is incorrect, our company will not be liable for the amount of loss</p>
              <p>If your beneficial information is incorrect, please contact customer service</p>
            </div>
          </div>
        </>
      )}

      {/* Modal Popup for Missing Bank Details */}
      {showPopup && (
        <div className="withdraw-modal-overlay">
          <div className="withdraw-modal-card">
            <p>! Add Bank Details first</p>
            <button onClick={() => navigate("/account/3/add-bank-account")}>Add Bank</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Withdraw;
