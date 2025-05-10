import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Smartphone,
  LockKeyhole,
  ShieldCheck,
  Eye,
  EyeOff,
} from "lucide-react";
import "./ForgotPassword.css";
import logo from "../../images/logo.png";


const ForgotPassword = () => {
  const navigate = useNavigate();

  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleReset = () => {
    if (!phoneNumber || !newPassword || !confirmPassword || !verificationCode || !agreedToPolicy) {
      alert("Please fill in all fields and agree to the policy.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log({
      countryCode,
      phoneNumber,
      newPassword,
      verificationCode,
    });
  };

  return (
    <div className="forgot-password-container">
      {/* ===== Header ===== */}
      <div className="forgot-password-header">
        <span className="forgot-password-back-arrow" onClick={handleBack}>
          <ChevronLeft size={24} />
        </span>
        <img
          src={logo}
          alt="logo"
          className="forgot-password-logo"
        />
      </div>

      {/* ===== Title Banner ===== */}
      <div className="forgot-password-banner">
        <h3>Forgot password</h3>
        <p>
          Please retrieve/change your password through your mobile phone number
          or email
        </p>
      </div>

      {/* ===== Section Title ===== */}
      <div className="forgot-password-section-title">
        <LockKeyhole size={32} />
        <span>Phone Reset</span>
      </div>

      {/* ===== Phone Number Field ===== */}
      <div className="forgot-password-field">
        <label>
          <Smartphone size={18} />
          <span>Phone number</span>
        </label>
        <div className="forgot-password-input-group styled-select-group">
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="country-select"
          >
            <option value="+91">🇮🇳 +91</option>
            <option value="+1">🇺🇸 +1</option>
            <option value="+44">🇬🇧 +44</option>
            <option value="+61">🇦🇺 +61</option>
            <option value="+81">🇯🇵 +81</option>
            <option value="+971">🇦🇪 +971</option>
            <option value="+880">🇧🇩 +880</option>
            <option value="+92">🇵🇰 +92</option>
          </select>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={10}
            placeholder="Please enter the phone number"
            value={phoneNumber}
            onChange={(e) => {
              const digits = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
              setPhoneNumber(digits);
            }}
          />
        </div>
      </div>

      {/* ===== New Password Field ===== */}
      <div className="forgot-password-field">
        <label>
          <LockKeyhole size={18} />
          <span>A new password</span>
        </label>
        <div className="forgot-password-input-wrapper">
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="A new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {showNewPassword ? (
            <EyeOff className="eye-icon" onClick={() => setShowNewPassword(false)} />
          ) : (
            <Eye className="eye-icon" onClick={() => setShowNewPassword(true)} />
          )}
        </div>
      </div>

      {/* ===== Confirm Password Field ===== */}
      <div className="forgot-password-field">
        <label>
          <LockKeyhole size={18} />
          <span>Confirm new password</span>
        </label>
        <div className="forgot-password-input-wrapper">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {showConfirmPassword ? (
            <EyeOff className="eye-icon" onClick={() => setShowConfirmPassword(false)} />
          ) : (
            <Eye className="eye-icon" onClick={() => setShowConfirmPassword(true)} />
          )}
        </div>
      </div>

      {/* ===== Verification Code Field ===== */}
      <div className="forgot-password-field">
        <label>
          <ShieldCheck size={18} />
          <span>Verification Code</span>
        </label>
        <div className="forgot-password-verification-group">
          <input
            type="text"
            placeholder="Please enter the confirmation code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button className="send-btn">Send</button>
        </div>
      </div>

      {/* ===== Agreement Section ===== */}
      <div className="forgot-password-agreement">
        <input
          type="checkbox"
          id="agree"
          className="forgot-password-checkbox"
          checked={agreedToPolicy}
          onChange={(e) => setAgreedToPolicy(e.target.checked)}
        />
        <label htmlFor="agree">
          I have read and agree <span className="privacy-link">[Privacy Agreement]</span>
        </label>
      </div>

      {/* ===== Reset Button ===== */}
      <button className="forgot-password-reset-btn" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default ForgotPassword;

