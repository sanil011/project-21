import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  ChevronLeft,
  UserRoundPen,
  LockKeyhole,
  Eye,
  EyeOff,
} from "lucide-react";
import { useSelector } from "react-redux";
import "./ChangePassword.css";
import api from "../../services/api";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { id, userName } = useSelector((store) => store.userData);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success | error

  const handleBack = () => navigate(-1);

  const handleSave = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("Please fill out all fields.");
      setMessageType("error");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // const { jwt } = JSON.parse(localStorage.getItem("lucky-game-user"));

      // const response = await fetch(
      //   "https://play-247.in/games/gamma/lucky9/changePassword",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${jwt}`,
      //     },
      //     body: JSON.stringify({
      //       oldPassword: currentPassword,
      //       newPassword: newPassword,
      //       userName: userName,
      //     }),
      //   }
      // );


      const response = await api.post('/gamma/lucky9/changePassword', {
        oldPassword: currentPassword,
        newPassword: newPassword,
        userName: userName,
      })

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const result = response.data;
        if (response.status < 200 || response.status >= 300) {
          throw new Error(result.message || "Failed to change password.");
        }
      } else {
        const text = response.data;
        if (response.status < 200 || response.status >= 300) {
          throw new Error(text || "Unexpected response format.");
        }
      }

      setMessage("Password changed successfully!");
      setMessageType("success");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage(error.message || "Something went wrong.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="change-password-container">
      {/* Header */}
      <div className="change-password-header">
        <span className="change-password-back-arrow" onClick={handleBack}>
          <ChevronLeft size={24} />
        </span>
        <h2 className="change-password-title">Change login password</h2>
      </div>

      {/* Password Fields */}
      {[
        {
          label: "Login password",
          icon: <UserRoundPen className="change-password-icon" />,
          value: currentPassword,
          setValue: setCurrentPassword,
          show: showCurrent,
          setShow: setShowCurrent,
          placeholder: "Login password",
        },
        {
          label: "New login password",
          icon: <LockKeyhole className="change-password-icon" />,
          value: newPassword,
          setValue: setNewPassword,
          show: showNew,
          setShow: setShowNew,
          placeholder: "New login password",
        },
        {
          label: "Confirm new password",
          icon: <LockKeyhole className="change-password-icon" />,
          value: confirmPassword,
          setValue: setConfirmPassword,
          show: showConfirm,
          setShow: setShowConfirm,
          placeholder: "Confirm new password",
        },
      ].map((field, index) => (
        <div className="change-password-field" key={index}>
          <label className="change-password-label">
            {field.icon}
            <span>{field.label}</span>
          </label>
          <div className="change-password-input-wrapper">
            <input
              type={field.show ? "text" : "password"}
              placeholder={field.placeholder}
              value={field.value}
              onChange={(e) => field.setValue(e.target.value)}
            />
            {/* Render only one eye icon */}
            {field.show ? (
              <EyeOff
                className="change-password-eye-icon"
                onClick={() => field.setShow(false)}
              />
            ) : (
              <Eye className="change-password-eye-icon" onClick={() => field.setShow(true)} />
            )}
          </div>
        </div>
      ))}

      {/* Forgot Link */}
      <NavLink
        to={`/account/${id}/forgot-password`}
        className="change-password-forgot-link"
      >
        Forgot original login password &gt;
      </NavLink>

      {/* Save Button */}
      <button
        className="change-password-save-btn"
        onClick={handleSave}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save changes"}
      </button>

      {/* Success/Error Message */}
      {message && (
        <p
          className={`change-password-message ${messageType === "success" ? "success" : "error"
            }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default ChangePassword;