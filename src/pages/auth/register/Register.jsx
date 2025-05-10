import React, { useState } from "react";
import axios from "axios"; // <-- Make sure this is added
import { useNavigate, Link } from "react-router-dom";
import {
  ChevronLeft,
  Smartphone,
  LockKeyhole,
  ShieldCheck,
  Eye,
  EyeOff,
  Mail,
  User,
} from "lucide-react";
import api from "../../../services/api";
import "./Register.css";

const IconWrapper = ({ children }) => (
  <div className="icon-wrapper">{children}</div>
);

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState(false);

  const handleRegister = async () => {
    const validationErrors = {};

    if (!name) validationErrors.name = "Please enter your full name.";
    if (!email) validationErrors.email = "Please enter your email address.";
    if (!phoneNumber) validationErrors.phoneNumber = "Please enter your phone number.";
    if (!password) validationErrors.password = "Please create a password.";
    if (!confirmPassword) validationErrors.confirmPassword = "Please confirm your password.";
    if (password !== confirmPassword) validationErrors.passwordMatch = "Passwords do not match.";
    if (!agreed) validationErrors.agreed = "Please agree to the terms and conditions.";

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const payload = {
      emailAccount: email,
      phoneNumber: phoneNumber,
      name: name,
      password: password,
    };

    try {
      const response = await axios.post(
        "https://play-247.in/games/gamma/lucky9/registrationRequest",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Raw response:", response.data);

      if (response.status === 200) {
        setIsSuccessPopupVisible(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setErrors({ server: "Registration failed. Please try again." });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({
        server:
          error?.response?.data?.message ||
          "An error occurred. Please try again later.",
      });
    }
  };
  return (
    <div className="register-container">
      {/* Header */}
      <div className="register-header">
        <span className="register-back-arrow" onClick={() => navigate(-1)}>
          <ChevronLeft size={28} />
        </span>
        <img src="src/images/logo.png" alt="logo" className="register-logo" />
      </div>

      {/* Banner */}
      <div className="register-banner">
        <h3>Register</h3>
        <p>Quickly register using your mobile phone number</p>
      </div>

      {/* Section Title */}
      <div className="register-section-title">
        <IconWrapper>
          <Smartphone size={22} />
        </IconWrapper>
        <span className="register-section-label">Phone registration</span>
      </div>

      {/* Name */}
      <div className="register-field">
        <label>
          <IconWrapper><User size={18} /></IconWrapper>
          <span>Full name</span>
        </label>
        <div className="register-input-wrapper">
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {errors.name && <p className="register-error-message">{errors.name}</p>}
      </div>

      {/* Email */}
      <div className="register-field">
        <label>
          <IconWrapper><Mail size={18} /></IconWrapper>
          <span>Email address</span>
        </label>
        <div className="register-input-wrapper">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {errors.email && <p className="register-error-message">{errors.email}</p>}
      </div>

      {/* Phone Number */}
      <div className="register-field">
        <label>
          <IconWrapper><Smartphone size={18} /></IconWrapper>
          <span>Phone number</span>
        </label>
        <div className="register-input-group">
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
            onChange={(e) =>
              setPhoneNumber(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))
            }
          />
        </div>
        {errors.phoneNumber && <p className="register-error-message">{errors.phoneNumber}</p>}
      </div>

      {/* Password */}
      <div className="register-field">
        <label>
          <IconWrapper><LockKeyhole size={18} /></IconWrapper>
          <span>Create password</span>
        </label>
        <div className="register-input-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPassword ? (
            <EyeOff className="eye-icon" onClick={() => setShowPassword(false)} />
          ) : (
            <Eye className="eye-icon" onClick={() => setShowPassword(true)} />
          )}
        </div>
        {errors.password && <p className="register-error-message">{errors.password}</p>}
        {errors.passwordMatch && <p className="register-error-message">{errors.passwordMatch}</p>}
      </div>

      {/* Confirm Password */}
      <div className="register-field">
        <label>
          <IconWrapper><LockKeyhole size={18} /></IconWrapper>
          <span>Confirm password</span>
        </label>
        <div className="register-input-wrapper">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {showConfirmPassword ? (
            <EyeOff className="eye-icon" onClick={() => setShowConfirmPassword(false)} />
          ) : (
            <Eye className="eye-icon" onClick={() => setShowConfirmPassword(true)} />
          )}
        </div>
        {errors.confirmPassword && <p className="register-error-message">{errors.confirmPassword}</p>}
      </div>

      {/* Invitation Code (Agent ID) */}
      {/* <div className="register-field">
        <label>
          <IconWrapper><ShieldCheck size={18} /></IconWrapper>
          <span>Invitation Code (Agent ID)</span>
        </label>
        <div className="register-input-wrapper">
          <input
            type="text"
            placeholder="Enter invitation code"
            value={agentId}
            onChange={(e) => setAgentId(e.target.value)}
          />
        </div>
        {errors.agentId && <p className="register-error-message">{errors.agentId}</p>}
      </div> */}

      {/* Agreement */}
      <div className="register-agreement">
        <input
          type="checkbox"
          id="agree"
          className="register-checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        />
        <label htmlFor="agree">
          I have read and agree <span className="privacy-link">[Terms & Policy]</span>
        </label>
        {errors.agreed && <p className="register-error-message">{errors.agreed}</p>}
      </div>

      {/* Register Button */}
      <button className="register-submit-btn" onClick={handleRegister}>
        Register
      </button>

      {/* Success Popup */}
      {isSuccessPopupVisible && (
        <div className="register-success-popup">
          <p>Registration Successful!</p>
        </div>
      )}

      {/* Already Have an Account */}
      <Link to="/login" className="w-full flex justify-center">
        <button className="register-login-btn">
          I have an account <span>Login</span>
        </button>
      </Link>
    </div>
  );
};

export default Register;
