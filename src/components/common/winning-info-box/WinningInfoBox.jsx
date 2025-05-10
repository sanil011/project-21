import { useEffect, useState } from "react";
import { winningInfo } from "../../../data";
import "./WinningInfoBox.css";

const WinningInfoBox = () => {
  const [winningInformation, setWinningInformation] = useState(winningInfo);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true); // Trigger fade out

      setTimeout(() => {
        setWinningInformation((prev) => {
          if (prev.length > 1) {
            const lastItem = prev[prev.length - 1];
            return [lastItem, ...prev.slice(0, prev.length - 1)];
          }
          return prev;
        });
        setFade(false); // Fade back in after update
      }, 300); // Matches CSS animation time
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="winning-box-container">
      <div className="winning-box-header">
        <div className="winning-box-dot"></div>
        Winning information
      </div>

      <div className={`winning-box-list ${fade ? "fade" : ""}`}>
        {winningInformation.map((winner) => (
          <div key={winner.id} className="winning-card">
            <div className="winner-info">
              <div className="winner-avatar">
                <img src={winner.winnerImage} alt="Winner" />
              </div>
              <span className="winner-name">
                Mem***{winner.name.slice(-3)}
              </span>
            </div>

            <div className="game-image">
              <img src={winner.gameImage} alt="Game" />
            </div>

            <div className="amount-info">
              <div className="amount-value">Receive ₹{winner.received}</div>
              <div className="amount-label">Winning amount</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WinningInfoBox;
