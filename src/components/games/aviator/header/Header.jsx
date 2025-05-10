import React, { useState } from 'react';
import './Header.css';
import {
  Menu,
  Volume2,
  Music,
  Settings2,
  Star,
  Clock,
  BarChart,
  HelpCircle,
  ScrollText,
  ShieldCheck
} from 'lucide-react';
import aviatorLogo from '../../../../images/aviator-header.png';
import { useSelector } from "react-redux";

const Header = ({musicEnabled, setMusicEnabled}) => {
    const {name,balance} = useSelector(store => store.userData); // userData
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Toggle states
    const [soundEnabled, setSoundEnabled] = useState(false);
    const [animationEnabled, setAnimationEnabled] = useState(true);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
      <>
        {/* ---------- Top Navigation Header ---------- */}
        <div className="aviator-header">
          <div className="aviator-left">
            {/* Replace text logo with PNG */}
            <img
              src={aviatorLogo}  // replace with your actual image path
              alt="Aviator Logo"
              className="aviator-logo-img"
            />
          </div>
          <div className="aviator-right">
            <span className="aviator-balance">
              {/* Amount styled differently */}
              <span className="aviator-amount">{balance.toFixed(2)}</span> 
              <span className="aviator-currency">RS</span>  {/* Add this for the currency */}
            </span>
            <div className="aviator-menu" onClick={toggleMenu}>
              <Menu size={20} color="#727779" />
            </div>
          </div>
        </div>

        {/* ---------- Slide-out Profile & Settings Menu ---------- */}
        {isMenuOpen && (
          <div className="aviator-modal">
            {/* User Profile Section */}
            <div className="aviator-profile">
              <div className="aviator-profile-details">
                <div className="aviator-username">{name}</div>
                <button className="aviator-avatar-btn">Change Avatar</button>
              </div>
              <img
                src={"https://i.imgur.com/7k12EPD.png"}
                alt="Avatar"
                className="aviator-avatar"
              />
            </div>

            {/* Menu Options */}
            <ul className="aviator-menu-list">
              <li onClick={() => setSoundEnabled(!soundEnabled)}>
                <div className="menu-label"><Volume2 size={18} color="#727779" /> Sound</div>
                <span className={`toggle-switch ${soundEnabled ? 'active' : ''}`} />
              </li>
              <li onClick={() => setMusicEnabled(!musicEnabled)}>
                <div className="menu-label"><Music size={18} color="#727779"/> Music</div>
                <span className={`toggle-switch ${musicEnabled ? 'active' : ''}`} />
              </li>
              {/* Add other menu items here */}
            </ul>
          </div>
        )}
      </>
    );
};

export default Header;
