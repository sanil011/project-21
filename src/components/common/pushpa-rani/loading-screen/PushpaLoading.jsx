import  { useState, useEffect } from "react";
import pushpaLogo from '../../../../images/pushpa-logo.png';
import headFront from '../../../../images/head-front.png';
import "./PushpaLoading.css"; // Assuming the CSS is in this file

const PushpaLoading = ({ progress }) => {
  return (
<div className="pushpa-rani-loading-screen">
  <img className="pushpa-rani-loading-logo" src={pushpaLogo} alt="Logo" />

  {/* Wrapper ensures correct positioning */}
  <div className="pushpa-rani-loading-wrapper">
    {/* Car positioned above the loading bar */}
    <img 
      className="pushpa-rani-head-icon" 
      src={headFront} 
      alt="Car"
      style={{ 
        left: `calc(${progress}% - 12%)`, /* Adjusted for exact start and end */
        transform: "translateX(-50%)" 
      }}  
    />

    <div className="pushpa-rani-loading-bar-container">
      <div className="pushpa-rani-loading-bar" style={{ width: `${progress}%` }}></div>
    </div>
  </div>

  <span className="pushpa-rani-progress-text">{progress}%</span>
</div>

  );
};

export default PushpaLoading;