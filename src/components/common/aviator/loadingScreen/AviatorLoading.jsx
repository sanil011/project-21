import React, { useState, useEffect } from 'react';
import aviatorLogo from '../../../../images/aviator-logo.png'; 
import './AviatorLoading.css'; // Assuming the CSS is in this file

const AviatorLoading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Set up an interval to simulate the loading progress
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(interval); // Stop the interval once progress reaches 100
          return 100;
        }
        return prevProgress + 1; // Increase the progress by 1%
      });
    }, 30); // Adjust the speed of loading here (30ms interval)

    // Clean up the interval when the component is unmounted or completed
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-screen">
      <img className="loading-logo" src={aviatorLogo} alt="Logo" />
      <div className="loading-bar-container">
        <div className="loading-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <span className="progress-text">{progress}%</span> {/* Progress Text Below */}
    </div>
  );
};

export default AviatorLoading;