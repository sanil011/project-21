import React, { useEffect } from "react";
import "./GameTypePickerModal.css";

const GameTypePickerModal = ({
  isOpen,
  onClose,
  gameType,
  onSelect,
  selectedOption,
}) => {
  if (!isOpen) return null;

  const options = {
    Lottery: [
      { label: "Win Go" },
      { label: "Trx Win Go" },
      { label: "5D" },
      { label: "K3" },
    ],
    Casino: [
      { label: "All", icon: "🔲" },
      { label: "AG_Video", icon: "🎥" },
      { label: "EVO_Video", icon: "🎲" },
      { label: "MG_Video", icon: "🎰" },
    ],
    Fishing: [
      { label: "All" },
      { label: "JILI" },
      { label: "CQ9" },
      { label: "V8Card" },
      { label: "MG_Fish" },
    ],
    Rummy: [
      { label: "All" },
      { label: "VB Card" },
    ],
    Originals: [
      { label: "All" },
      { label: "TB_Chess" },
      { label: "JILI" },
      { label: "SPRIBE" },
    ],
    Sports: [],
  };

  const list = options[gameType] || [];

  // Automatically select the first label if nothing is selected
  useEffect(() => {
    if (isOpen && list.length > 0) {
      onSelect(list[0].label); // always pick first label on gameType change
    }
  }, [isOpen, gameType]);

  const activeOption = selectedOption || list[0]?.label;

  return (
    <div className="game-type-modal-overlay" onClick={onClose}>
      <div
        className={`game-type-modal-content ${isOpen ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {list.map((item) => (
          <button
            key={item.label}
            className={`game-type-option ${
              activeOption === item.label ? "selected" : ""
            }`}
            onClick={() => {
              onSelect(item.label);
              onClose();
            }}
          >
            {item.icon && <span className="game-type-icon">{item.icon}</span>}
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameTypePickerModal;