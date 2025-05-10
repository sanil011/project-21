import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Banknote,
  KeyRound,
  CreditCard,
  Lock,
  ChevronLeft,
} from "lucide-react";
import "./AddBankAccount.css";
import api from "../../../services/api";
const AddBankAccount = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    accountName: "",
    accountNo: "",
    ifsc: "",
    upiId: "",
    otp: "",
    password: "",
  });

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const storedData = localStorage.getItem("lucky-game-user");
        if (!storedData) {
          alert("User not authenticated. Please log in.");
          return;
        }

        const response = await api.get("/gamma/lucky9/getBankAccount")

        if (response.status === 200 && response.data) {
          setFormData((prev) => ({
            ...prev,
            accountName: response.data.accountName || "",
            accountNo: response.data.accountNo || "",
            upiId: response.data.upiId || "",
            ifsc: response.data.ifsc || "",
          }));
        }
      } catch (error) {
        console.error("Error fetching bank details:", error);
      }
    };

    fetchBankDetails();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.accountName || !formData.accountNo || !formData.ifsc || !formData.password) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const storedData = localStorage.getItem("lucky-game-user");
      if (!storedData) {
        alert("User not authenticated. Please log in.");
        return;
      }

      const response = await api.post(
        "/gamma/lucky9/registerAccount",
        formData,
      );

      if (response.status === 200) {
        alert("Bank details added successfully!");
        navigate(-1);
      }
    } catch (error) {
      console.error("Error adding bank details:", error);
      alert("Failed to add bank details. Please try again.");
    }
  };

  return (
    <div className="bank-container">
      <div className="bank-header">
        <button className="bank-back-button" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <span>Add Bank Account</span>
      </div>

      <div className="bank-warning">
        <span>
          <Lock size={18} />
        </span>
        To ensure the safety of your funds, please bind your bank account
      </div>

      <div className="bank-input-container">
        <label className="bank-label">
          <span className="icon-bg">
            <User size={20} />
          </span>
          Full recipient's name
        </label>
        <input
          className="bank-input"
          name="accountName"
          placeholder="Please enter the recipient’s name"
          value={formData.accountName}
          onChange={handleChange}
        />

        <label className="bank-label">
          <span className="icon-bg">
            <Banknote size={20} />
          </span>
          Bank account number
        </label>
        <input
          className="bank-input"
          name="accountNo"
          placeholder="Please enter your bank account number"
          value={formData.accountNo}
          onChange={handleChange}
        />

        <label className="bank-label">
          <span className="icon-bg">
            <KeyRound size={20} />
          </span>
          IFSC code
        </label>
        <input
          className="bank-input"
          name="ifsc"
          placeholder="Please enter IFSC code"
          value={formData.ifsc}
          onChange={handleChange}
        />

        <label className="bank-label">
          <span className="icon-bg">
            <CreditCard size={20} />
          </span>
          UPI ID (Optional)
        </label>
        <input
          className="bank-input"
          name="upiId"
          placeholder="Enter UPI ID (if any)"
          value={formData.upiId}
          onChange={handleChange}
        />

        <label className="bank-label">
          <span className="icon-bg">
            <Lock size={20} />
          </span>
          Password
        </label>
        <input
          type="password"
          className="bank-input"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <button className="bank-save-button" onClick={handleSubmit}>
        Save
      </button>
    </div>
  );
};

export default AddBankAccount;
