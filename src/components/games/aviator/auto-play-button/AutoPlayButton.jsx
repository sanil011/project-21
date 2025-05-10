import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./AutoPlayButton.css";

const AutoPlayButton = ({
  newRoundStarted,
  handleBet,
  isBetPlaced,
  setIsBetPlaced,
  setBetPlacedBeforeStart,
}) => {
  const defaultSettings = {
    stopDecrease: false,
    stopIncrease: false,
    stopSingleWin: false,
    decreaseAmount: 0.0,
    increaseAmount: 0.0,
    singleWinAmount: 0.0,
    selectedRounds: 2,
  };

  const { balance } = useSelector((store) => store.userData);
  const [isModalOpen, setModalOpen] = useState(false);
  const [settings, setSettings] = useState(defaultSettings);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [roundsLeft, setRoundsLeft] = useState(0);
  const [startingBalance, setStartingBalance] = useState(balance);

  const toggleSetting = (setting) => {
    setSettings({ ...settings, [setting]: !settings[setting] });
  };

  const adjustValue = (amountKey, change, isEnabled) => {
    if (!isEnabled) return;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [amountKey]: Math.max(0, prevSettings[amountKey] + change),
    }));
  };

  const selectRounds = (round) => {
    setSettings({ ...settings, selectedRounds: round });
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const stopAutoPlay = () => {
    console.log("Auto Play Stopped");
    setIsAutoPlaying(false);
    setRoundsLeft(0);
  };

  const startAutoPlay = () => {
    if (isAutoPlaying) {
      stopAutoPlay();
    } else {
      setIsAutoPlaying(true);
      setRoundsLeft(settings.selectedRounds);
      setStartingBalance(balance);
      setModalOpen(false);
    }
  };

  useEffect(() => {
    if (!newRoundStarted && !isBetPlaced) {
      if (isAutoPlaying && roundsLeft > 0) {
        // Check "stop if cash decreases" condition
        if (
          settings.stopDecrease &&
          startingBalance - balance >= settings.decreaseAmount
        ) {
          console.log("Auto Play stopped: Cash decreased by threshold.");
          stopAutoPlay();
          return;
        }

        // ✅ Check "stop if cash increases" condition
        if (
          settings.stopIncrease &&
          balance - startingBalance >= settings.increaseAmount
        ) {
          console.log("Auto Play stopped: Cash increased by threshold.");
          stopAutoPlay();
          return;
        }

        setBetPlacedBeforeStart(false);
        setTimeout(() => {
          console.log(`Auto Play - Rounds Left: ${roundsLeft - 1}`);
          setRoundsLeft((prev) => prev - 1);
          handleBet();
        }, 1000);
      }
    }

    if (roundsLeft === 0 && isAutoPlaying) {
      stopAutoPlay();
    }
  }, [newRoundStarted, isBetPlaced, isAutoPlaying, roundsLeft, balance]);

  useEffect(() => {
    if (!isAutoPlaying) {
      stopAutoPlay();
    }
  }, [isAutoPlaying]);

  return (
    <div className="auto-play-container">
      <button
        className={`auto-play-button text-xs font-light ${isAutoPlaying ? "auto-play-active" : ""
          }`}
        onClick={() => {
          if (isAutoPlaying) {
            setIsAutoPlaying(false);
            setRoundsLeft(0);
          } else {
            setModalOpen(true);
          }
        }}
      >
        {isAutoPlaying ? `STOP (${roundsLeft})` : "AUTO PLAY"}
      </button>

      {isModalOpen && (
        <div
          className="auto-play-modal-overlay"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="auto-play-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="auto-play-modal-header">
              <h2>Auto play options</h2>
              <button
                className="auto-play-close-btn"
                onClick={() => setModalOpen(false)}
              >
                ✖
              </button>
            </div>

            <div className="auto-play-rounds-section">
              <h4>Number of Rounds:</h4>
              <div className="auto-play-round-buttons-container">
                {[10, 20, 50, 100].map((round) => (
                  <button
                    key={round}
                    className={`auto-play-round-button ${settings.selectedRounds === round
                        ? "auto-play-selected"
                        : ""
                      }`}
                    onClick={() => selectRounds(round)}
                  >
                    {round}
                  </button>
                ))}
              </div>
            </div>

            <div className="auto-play-settings">
              {[
                {
                  key: "stopDecrease",
                  label: "Stop if cash decreases by",
                  amountKey: "decreaseAmount",
                },
                {
                  key: "stopIncrease",
                  label: "Stop if cash increases by",
                  amountKey: "increaseAmount",
                },
                {
                  key: "stopSingleWin",
                  label: "Stop if single win exceeds",
                  amountKey: "singleWinAmount",
                },
              ].map(({ key, label, amountKey }) => {
                const isEnabled = settings[key];

                return (
                  <div
                    className={`auto-play-setting-option ${!isEnabled ? "auto-play-inactive" : ""
                      }`}
                    key={key}
                  >
                    <label className="auto-play-toggle-switch">
                      <input
                        type="checkbox"
                        checked={isEnabled}
                        onChange={() => toggleSetting(key)}
                      />
                      <span className="auto-play-slider"></span>
                    </label>
                    <span className="setting-label">{label}</span>
                    <div className="auto-play-input-group">
                      <button
                        className="auto-play-input-btn"
                        onClick={() =>
                          adjustValue(amountKey, -100, isEnabled)
                        }
                        disabled={!isEnabled}
                      >
                        -
                      </button>
                      <input
                        className="auto-play-auto-input"
                        type="number"
                        value={settings[amountKey].toFixed(2)}
                        readOnly
                      />
                      <button
                        className="auto-play-input-btn"
                        onClick={() =>
                          adjustValue(amountKey, 100, isEnabled)
                        }
                        disabled={!isEnabled}
                      >
                        +
                      </button>
                    </div>
                    <span className="auto-play-usd-label">RS</span>
                  </div>
                );
              })}
            </div>

            <div className="auto-play-modal-buttons">
              <button
                className="auto-play-reset-button"
                onClick={resetSettings}
              >
                Reset
              </button>
              <button
                className="auto-play-start-button"
                onClick={startAutoPlay}
              >
                Start
              </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default AutoPlayButton;
