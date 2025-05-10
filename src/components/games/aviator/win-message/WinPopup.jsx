import React from 'react';
import './WinPopup.css';

const WinPopup = ({ multiplier, amount, onClose }) => {
  return (
    <div className="win-popup-container">
      <div className="win-popup">
        <div className="win-popup-left">
          <div className="win-popup-text">You have cashed out!</div>
          <div className="win-popup-multiplier">{multiplier}x</div>
        </div>
        <div className="win-popup-right">
          <div className="win-popup-amount">Win RS</div>
          <div className="win-popup-value">{amount}</div>
        </div>

        {/* ✅ Close button properly positioned */}
        <span className="win-popup-close" onClick={onClose}>×</span>
      </div>
    </div>
  );
};

export default WinPopup;
