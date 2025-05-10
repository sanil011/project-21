import React, { useState } from 'react';
import WinPopup from './WinPopup'; // adjust path if needed
import './WinPopup.css';

const Win = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => setShowPopup(true)} style={styles.button}>
        Show Win Popup
      </button>

      {showPopup && (
        <WinPopup
          multiplier={1.05}
          amount={1.05}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

const styles = {
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export default Win;
