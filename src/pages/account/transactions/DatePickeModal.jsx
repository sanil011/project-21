import React, { useState, useEffect, useRef } from "react";
import "./DatePickerModal.css";

const DatePickerModal = ({ isOpen, onClose, onDateSelect }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  const [showModal, setShowModal] = useState(false);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedDay, setSelectedDay] = useState(currentDay);

  const yearRef = useRef(null);
  const monthRef = useRef(null);
  const dayRef = useRef(null);

  const generateYears = () => {
    return Array.from({ length: 51 }, (_, i) => 1975 + i).filter(year => year <= 2025);
  };

  const generateMonths = () => Array.from({ length: 12 }, (_, i) => i);
  const generateDays = () => Array.from({ length: 31 }, (_, i) => i + 1);

  const scrollToSelected = (ref, list, selected) => {
    if (!ref.current) return;
    const itemHeight = ref.current.firstChild?.offsetHeight || 0;
    const index = list.findIndex((item) => item === selected);
    const top = index * itemHeight;
    ref.current.scrollTo({ top, behavior: "instant" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setShowModal(true);
        scrollToSelected(yearRef, generateYears(), selectedYear);
        scrollToSelected(monthRef, generateMonths(), selectedMonth);
        scrollToSelected(dayRef, generateDays(), selectedDay);
      }, 10);
    } else {
      setShowModal(false);
    }
  }, [isOpen]);

  const handleConfirm = () => {
    const selectedDate = new Date(selectedYear, selectedMonth, selectedDay);
    const formattedDate = selectedDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    onDateSelect(formattedDate); // ✅ Send formatted date to parent
    onClose();
  };

  const handleScrollStop = (ref, list, setSelected) => {
    if (!ref.current) return;
    const scrollTop = ref.current.scrollTop;
    const itemHeight = ref.current.firstChild?.offsetHeight || 0;
    const middleIndex = Math.round(scrollTop / itemHeight);
    const newValue = list[middleIndex];
    setSelected(newValue);

    // Snap to center
    ref.current.scrollTo({
      top: middleIndex * itemHeight,
      behavior: "smooth",
    });
  };

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  return (
    <div className={`modal-overlay ${isOpen ? "show" : ""}`} onClick={onClose}>
      <div
        className={`modal-container ${showModal ? "show" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <button className="modal-btn" onClick={onClose}>Cancel</button>
          <span className="modal-title">Choose a date</span>
          <button className="modal-btn confirm" onClick={handleConfirm}>Confirm</button>
        </div>

        <div className="date-picker">
          <div
            className="column"
            ref={yearRef}
            onScroll={debounce(() => handleScrollStop(yearRef, generateYears(), setSelectedYear), 100)}
          >
            {generateYears().map((year) => (
              <div key={year} className="date-item">{year}</div>
            ))}
          </div>

          <div
            className="column"
            ref={monthRef}
            onScroll={debounce(() => handleScrollStop(monthRef, generateMonths(), setSelectedMonth), 100)}
          >
            {generateMonths().map((month) => (
              <div key={month} className="date-item">
                {new Date(0, month).toLocaleString("default", { month: "short" })}
              </div>
            ))}
          </div>

          <div
            className="column"
            ref={dayRef}
            onScroll={debounce(() => handleScrollStop(dayRef, generateDays(), setSelectedDay), 100)}
          >
            {generateDays().map((day) => (
              <div key={day} className="date-item">{day-1}</div>
            ))}
          </div>
        </div>

        <div className="highlight-strip" />
      </div>
    </div>
  );
};

export default DatePickerModal;
