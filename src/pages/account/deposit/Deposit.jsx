import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import walletIcon from '../assets/wallet-icon.png';
import RefreshBtn from '../assets/refresh-btn.png';
import { ChevronLeft } from 'lucide-react'; // Import ChevronLeft from Lucid Icons
import { useSelector } from "react-redux";
import "./DepositPage.css";
import api from "../../../services/api";


const Deposit = () => {
  const { userName, id, balance, phoneNumber } = useSelector(store => store.userData); // userData
  const [selectedMethod, setSelectedMethod] = useState("E-Wallet");
  const [upiId, setUpiId] = useState("Rama@ybl"); // Set initial UPI ID state
  const [qrCode, setQrCode] = useState(null); // State for storing the QR Code image URL
  const [rechargeAmount, setRechargeAmount] = useState(""); // State for recharge amount
  const [upiTransactionId, setUpiTransactionId] = useState(""); // State for UPI transaction ID
  const [rechargeAmountError, setRechargeAmountError] = useState(false); // Error state for recharge amount
  const [upiTransactionIdError, setUpiTransactionIdError] = useState(false);// Error state for UPI transaction ID
  const [paymentScreenshot, setPaymentScreenshot] = useState();

  const navigate = useNavigate(); // Initialize useNavigate hook

  // Payment methods data
  const paymentMethods = [
    { name: "E-Wallet", bonus: "+1%" },
    { name: "UPI x QR", bonus: "+1%" },
    { name: "UPI", bonus: "+1%" },
  ];


  // Fetch UPI ID and QR Code from API
  const fetchUpiDetails = async () => {
    try {

      const response = await api.get("/gamma/lucky9/getUpis")
      const data = response.data; // Assuming the response format is [{qrCode, upiId}]
      console.log("sanil upi", data);
      if (data.length > 0) {
        // Assuming first index is for UPI and second is for UPI x QR
        if (selectedMethod === "UPI") {
          setUpiId(data[0].upiId);  // Set UPI ID for "UPI" method
          setQrCode(data[0].qrCode);  // Set QR code for "UPI" method
        } else if (selectedMethod === "UPI x QR") {
          setUpiId(data[1].upiId);  // Set UPI ID for "UPI x QR"
          setQrCode(data[1].qrCode);  // Set QR code for "UPI x QR"
        }
      }
    } catch (error) {
      console.error("Error fetching UPI details:", error);
    }
  };

  useEffect(() => {
    if (selectedMethod === "UPI" || selectedMethod === "UPI x QR") {
      fetchUpiDetails(); // Fetch UPI details when "UPI" or "UPI x QR" is selected
    }
  }, [selectedMethod]);

  // Handle changing the payment method and update the UPI ID
  const handlePaymentMethodChange = (method) => {
    setSelectedMethod(method);
  };

  // Handle form submission and API request
  const handleSubmit = async () => {
    setRechargeAmountError(false);
    setUpiTransactionIdError(false);

    let isValid = true;

    if (!rechargeAmount) {
      setRechargeAmountError(true);
      isValid = false;
    }

    if (!upiTransactionId) {
      setUpiTransactionIdError(true);
      isValid = false;
    }

    if (isValid) {
      console.log("Form submitted with the following data:");
      console.log("Username:", userName);
      console.log("Recharge Amount:", rechargeAmount);
      console.log("UPI Transaction ID:", upiTransactionId);
      console.log("UPI ID:", upiId);
      console.log("UPI ID:", phoneNumber);


      const payload = {
        amount: rechargeAmount,
        upiId: upiId,
        phoneNumber: phoneNumber,
      };

      try {
        const storedData = localStorage.getItem("lucky-game-user");
        if (!storedData) {
          alert("User not authenticated. Please log in.");
          return;
        }
        const { jwt } = JSON.parse(storedData);
        const response = await api.post('/gamma/lucky9/submitRechargeRequest', payload, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        const contentType = response.headers['content-type'];
        const responseText = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);

        console.log("🔍 Raw API Response:", responseText);

        if (response.status < 200 || response.status >= 300) {
          console.error("❌ API Error:", response.status, response.statusText);
          alert(`Error: ${response.status} ${response.statusText}`);
          return;
        }

        const result = response.data;
        console.log("✅ Deposit Response:", result);

      } catch (error) {
        console.error("❌ Request failed:", error);
      }
    }
  };

  // Back button functionality
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="deposit-container">
      {/* Header */}
      <div className="header">
        <button className="back-button" onClick={handleBack}><ChevronLeft /></button>
        <h2 className="header-title">Deposit</h2>
        <Link to={`/account/${id}/deposit-history`} className="history-text text-blue-500">
          Deposit history
        </Link>
      </div>

      {/* Balance Section */}
      <div className="balance-section">
        <div className="balance-left">
          <div className="balance-info">
            <div className="balance-title">
              <img src={walletIcon} alt="Wallet" className="wallet-icon" />
              <p className="balance-text">Balance</p>
            </div>
            <div className="balance-amount-container">
              <h3 className="balance-amount">₹{balance.toFixed(2)}</h3>
              <button className="refresh-button">
                <img src={RefreshBtn} alt="Refresh" className="refresh-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="payment-options">
        {paymentMethods.map((method, index) => (
          <div
            key={index}
            className={`payment-card ${selectedMethod === method.name ? "active" : ""}`}
            onClick={() => handlePaymentMethodChange(method.name)}
          >
            <span>{method.name}</span>
            {method.bonus && <div className="bonus-badge">{method.bonus}</div>}
          </div>
        ))}
      </div>

      {/* Conditional Content Based on Selected Payment Method */}
      <div className="payment-details">
        {(selectedMethod === "UPI" || selectedMethod === "UPI x QR") && (
          <div className="upi-payment-form">
            {/* Render QR code for UPI x QR method */}
            {qrCode && (
              <div className="qr-image-container">
                <img src={qrCode} alt="QR Code" className="qr-image" />
              </div>
            )}

            {/* UPI ID Section */}
            <div className="upi-row">
              <label className="upi-label">Payment UPI ID</label>
              <div className="upi-right">
                <span className="upi-id">{upiId}</span>
              </div>
            </div>

            {/* User Name Section */}
            <div className="upi-row">
              <label className="upi-label">User Name</label>
              <span className="user-name">{userName}</span>
            </div>

            {/* Recharge Amount */}
            <div className="upi-row">
              <label className="upi-label">Recharge Amount</label>
              <div className="deposit-input-container">
                <input
                  type="text"
                  className="deposit-input-box"
                  value={rechargeAmount}
                  onChange={(e) => setRechargeAmount(e.target.value)}
                  placeholder="Enter amount"
                />
                {rechargeAmountError && <span className="error-text">This field is required!</span>}
              </div>
            </div>

            {/* Payment Screenshot Upload */}
            <div className="upi-row flex justify-between items-center">
              <label className="upi-label">Payment Screenshot</label>

              <input
                type="file"
                id='payment-screenshot'
                accept="image/*"
                placeholder="Click"
                className="hidden"
                onChange={(e) => setPaymentScreenshot(e.target.files[0])}
              />
              <button
                onClick={() => {
                  const elem = document.getElementById('payment-screenshot');
                  elem?.click();
                }}
                className="bg-blue-400 w-[45%] rounded-sm text-black py-1.5"
              >Add</button>

            </div>

            {/* UPI Transaction ID */}
            <div className="upi-row">
              <label className="upi-label">UPI Transaction ID</label>
              <div className="deposit-input-container">
                <input
                  type="text"
                  className="deposit-input-box"
                  value={upiTransactionId}
                  onChange={(e) => setUpiTransactionId(e.target.value)}
                  placeholder="Enter transaction ID"
                />
                {upiTransactionIdError && <span className="error-text">This field is required!</span>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="button-container">
              <button className="submit-button" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        )}
      </div>

      {/* Select Channel Section */}
      <div className="channel-section">
        <h4>Select channel</h4>
        <div className="channel-grid">
          {[{ name: "7DaysPay - APP", balance: "200 - 100K", active: true },
          { name: "YayaPay - APP", balance: "300 - 50K" },
          { name: "BonusPay - APP", balance: "500 - 50K", bonus: "1% bonus" },
          { name: "CpuPay - APP", balance: "500 - 50K" },
          { name: "FunPay - APP" },
          { name: "CloudsPay - APP" }].map((channel, index) => (
            <div key={index} className={`channel-card ${channel.active ? "active" : ""}`}>
              <span>{channel.name}</span>
              {channel.balance && <p>Balance: {channel.balance}</p>}
              {channel.bonus && <span className="bonus-text">{channel.bonus}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Deposit;
