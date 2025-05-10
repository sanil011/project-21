import React, { useEffect, useRef, useState } from "react";
import "./BankTypePickerModal.css";

const BankTypePickerModal = ({ isOpen, onClose, selectedOption, onSelect }) => {
  const options = [
    { label: "All" },
    { label: "Requested" },
    { label: "Completed" },
    { label: "Failed" },
  ];

  const scrollRef = useRef(null);
  const [activeOption, setActiveOption] = useState(selectedOption || options[0].label);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        const index = options.findIndex((o) => o.label === activeOption) + 2;
        const itemHeight = scrollRef.current.firstChild?.offsetHeight || 0;
        scrollRef.current.scrollTo({
          top: index * itemHeight - scrollRef.current.offsetHeight / 2 + itemHeight / 2,
          behavior: "instant",
        });
      }, 10);
    }
  }, [isOpen]);

  const handleScrollStop = () => {
    const container = scrollRef.current;
    if (!container) return;

    const itemHeight = container.firstChild?.offsetHeight || 0;
    const visibleHeight = container.offsetHeight;
    const middleIndex = Math.round(
      (container.scrollTop + visibleHeight / 2 - itemHeight / 2) / itemHeight
    );
    const centeredItem = options[middleIndex -2];

    if (centeredItem) {
      setActiveOption(centeredItem.label);
    }

    container.scrollTo({
      top: middleIndex * itemHeight - visibleHeight / 2 + itemHeight / 2,
      behavior: "smooth",
    });
  };

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  if (!isOpen) return null;

  return (
    <div className="bank-type-modal-overlay" onClick={onClose}>
      <div
        className="bank-type-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bank-type-modal-header">
          <button className="bank-type-modal-btn cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            className="bank-type-modal-btn confirm"
            onClick={() => {
              onSelect(activeOption);
              onClose();
            }}
          >
            Confirm
          </button>
        </div>

        <div
          className="bank-type-scroll"
          ref={scrollRef}
          onScroll={debounce(handleScrollStop, 100)}
        >
          {options.map((item) => (
            <div
              key={item.label}
              className={`bank-type-item ${
                activeOption === item.label ? "active" : ""
              }`}
            >
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <div className="bank-type-highlight-strip" />
      </div>
    </div>
  );
};

export default BankTypePickerModal;
