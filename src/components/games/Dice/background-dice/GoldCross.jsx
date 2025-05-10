import React from 'react';
import bgImage from './dice-bg0.png';

const CrossShape = ({ containerStyle, verticalStyle, className }) => (
  <div style={containerStyle} className={className}>
    <div style={verticalStyle}></div>
  </div>
);

const GoldCross = () => {
  const spinAnimation = 'spin 55s linear infinite';

  const goldCrossBase = {
    width: '140px',
    height: '45px',
    background: 'linear-gradient(135deg, #fbdf9a, #8c6a37)',
    borderRadius: '22px',
    position: 'absolute',
    transform: 'rotate(45deg)',
    animation: spinAnimation,
    boxShadow: '0 8px 15px rgba(0, 0, 0, 1)',
    zIndex: 2,
  };

  const goldCrossBefore = {
    content: '""',
    position: 'absolute',
    width: '45px',
    height: '140px',
    top: '-47.5px',
    left: '47.5px',
    background: 'linear-gradient(135deg, #fbdf9a, #8c6a37)',
    borderRadius: '22px',
  };

  const bigCrossBase = {
    position: 'absolute',
    width: '200px',
    height: '60px',
    backgroundColor: '#1e1825',
    borderRadius: '30px',
    transform: 'rotate(45deg)',
    opacity: 0.8,
    animation: 'spin 100s linear infinite',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 1)',
    zIndex: 1,
    top: '50%',   // Center vertically
    left: '30%',  // Center horizontally
    transform: 'translate(-50%, -50%) rotate(45deg)', // Use translate for perfect centering
  };

  const bigCrossBefore = {
    position: 'absolute',
    width: '60px',
    height: '200px',
    top: '-70px',
    left: '70px',
    backgroundColor: '#1e1825',
    borderRadius: '30px',
  };

  return (
    <>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes backgroundMove {
          0% { background-position: 0 0; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0 0; }
        }

        .background-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url(${bgImage});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          filter: blur(8px);
          animation: backgroundMove 30s ease-in-out infinite;
          z-index: 0;
        }
      `}</style>

      {/* 🌐 Responsive wrapper with max-width */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          zIndex: -1,
        }}
      >
        {/* ✨ 400px centered container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '400px',
            height: '100%',
          }}
        >
          {/* 🌫️ Background */}
          <div className="background-image" />

          {/* 🌓 Big shadow cross (Centered) */}
          <CrossShape containerStyle={bigCrossBase} verticalStyle={bigCrossBefore} />

          {/* ✨ Two gold spinning crosses */}
          <CrossShape
            containerStyle={{ ...goldCrossBase, top: 'calc(50% - 180px)', left: 'calc(50% - 150px)' }}
            verticalStyle={goldCrossBefore}
          />
          <CrossShape
            containerStyle={{ ...goldCrossBase, top: 'calc(50% + 150px)', left: 'calc(50% + 10px)' }}
            verticalStyle={goldCrossBefore}
          />
        </div>
      </div>
    </>
  );
};

export default GoldCross;
