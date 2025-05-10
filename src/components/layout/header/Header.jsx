import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { logo } from "../../../images";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MailOutline } from "@mui/icons-material";
import "./Header.css";

const Header = () => {
  const { isAuthenticated, balance, id } = useSelector((store) => store.userData);

  const LOCAL_STORAGE_KEY = `mailSeen_${id}`; // Unique per user
  const [hasUnread, setHasUnread] = useState(() => {
    return localStorage.getItem(LOCAL_STORAGE_KEY) !== "true"; // true = user hasn't seen it
  });

  const handleMailClick = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, "true"); // Mark as seen
    setHasUnread(false);
  };

  return (
    <Box className="header-wrapper">
      <div className="header-logo">
        <img src={logo} className="logo-img" alt="Play247" />
      </div>

      {!isAuthenticated ? (
        <div className="header-auth-buttons">
          <Button variant="outlined" component={Link} to="/login">
            Log in
          </Button>
          <Button variant="contained" component={Link} to="/register">
            Register
          </Button>
        </div>
      ) : (
        <Link
          to={`/account/${id}/messages`}
          style={{ textDecoration: "none" }}
          onClick={handleMailClick}
        >
          <Box className="header-balance-box">
            <Typography className="header-balance-text">
              ₹{balance.toFixed(2)}
            </Typography>
            <div className="header-mail-wrapper">
              <MailOutline className="header-mail-icon" />
              {hasUnread && <span className="header-mail-dot" />}
            </div>
          </Box>
        </Link>
      )}
    </Box>
  );
};

export default Header;
