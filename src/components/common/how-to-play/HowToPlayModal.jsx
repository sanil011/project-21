import React from "react";
import "./HowToPlayModal.css";

const HowToPlayModal = ({ onClose, content }) => {
  return (
    <div className="howto-modal-overlay">
      <div className="howto-modal-container">
        <div className="howto-modal-header">How to play</div>

        <div className="howto-modal-content">
          {content.map((line, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: line }}></p>
          ))}
        </div>

        <div className="howto-modal-footer">
          <button className="howto-modal-close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowToPlayModal;

