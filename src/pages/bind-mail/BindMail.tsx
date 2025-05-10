import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBackIosNewRounded, Email, VerifiedUser } from "@mui/icons-material";
import "./BindMail.css";

const BindMailPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  return (
    <div className="bind-container">
      {/* Header */}
      <div className="bind-header">
        <button onClick={() => navigate(-1)}>
          <ArrowBackIosNewRounded className="bind-back-icon" />
        </button>
        <div className="bind-header-title">Bind mailbox</div>
        <div className="bind-back-placeholder" />
      </div>

      {/* Form */}
      <div className="bind-form">
        {/* Email */}
        <div className="bind-field">
          <label className="bind-label">
            <Email className="bind-label-icon" fontSize="medium" />
            Mail
          </label>
          <input
            type="email"
            className="bind-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="please input your email"
          />
        </div>

        {/* Code */}
        <div className="bind-field">
          <label className="bind-label">
            <VerifiedUser className="bind-label-icon" fontSize="medium" />
            Verification Code
          </label>
          <div className="bind-code-input-wrapper">
            <input
              type="text"
              className="bind-input flex-grow"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Please enter the confirmation code"
            />
            <button className="bind-send-btn">Send</button>
          </div>
        </div>

        {/* Bind Button */}
        <button className="bind-submit-btn">Bind</button>
      </div>
    </div>
  );
};

export default BindMailPage;
