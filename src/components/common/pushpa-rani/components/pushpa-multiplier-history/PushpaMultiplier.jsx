import { useState, useEffect, useRef } from "react";
import "./PushpaMultiplier.css"; // Import CSS file
import api from "../../../../../services/api";


const MultiplierHistory = ({ isPlaneCrashed }) => {
  const [multipliers, setMultipliers] = useState([]);
  const [showFullHistory, setShowFullHistory] = useState(false);
  const containerRef = useRef(null);
  const [maxVisible, setMaxVisible] = useState(10);
  const prevIsPlaneCrashed = useRef(isPlaneCrashed);

  const fetchLatestMultiplier = async (fetchAll = false) => {
    try {
      const response = await api.get("/api/v1/virtual-games/aviator/getMultiplierHistory?gameName=pushpa")

      const data = response.data;

      if (!data.success) {
        setMultipliers((prev) => [...prev]);
      }

      if (Array.isArray(data) && data.length > 0) {
        if (fetchAll) {
          // Fetch all multipliers on mount
          setMultipliers(data);
        } else {
          // Add only the latest multiplier when the plane stops crashing
          setMultipliers((prev) => [data[0], ...prev]);
        }
      }
    } catch (error) {
      setMultipliers((prev) => [1.00, ...prev]);
      console.error("Error fetching multiplier:", error);
    }
  };

  // Fetch all multipliers when the component mounts
  useEffect(() => {
    fetchLatestMultiplier(true); // Pass `true` to fetch all values initially
  }, []);

  // Fetch only the latest multiplier when planeCrashed goes from `true → false`
  useEffect(() => {
    if (prevIsPlaneCrashed.current && !isPlaneCrashed) {
      setTimeout(() => {
        fetchLatestMultiplier(false); // Fetch only the latest value after 0.5s delay
      }, 1000);
    }
    prevIsPlaneCrashed.current = isPlaneCrashed;
  }, [isPlaneCrashed]);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const itemWidth = 60; // Approximate width of each multiplier
        const count = Math.floor(containerWidth / itemWidth);
        setMaxVisible(count);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, [multipliers]);

  return (
    <div className="pushpa-history-container">
      {/* Full History (Overlaps the Row, Keeps Button Visible) */}
      {showFullHistory && (
        <div className="pushpa-full-history">
          <div className="pushpa-full-history-header">
            <h3>ROUND HISTORY</h3>
          </div>
          <div className="pushpa-history-grid">
            {multipliers.map((multiplier, index) => (
              <span
                key={index}
                className={`pushpa-multiplier ${multiplier >= 10 ? "pushpa-pink" : multiplier >= 2 ? "pushpa-purple" : "pushpa-blue"
                  }`}
              >
                {multiplier.toFixed(2)}x
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Top Row (Remains Clickable) */}
      <div className="pushpa-multiplier-container" ref={containerRef}>
        <div className={`pushpa-multipliers ${showFullHistory ? "blurred" : ""}`}>
          {multipliers.slice(0, maxVisible).map((multiplier, index) => (
            <span
              key={index}
              className={`pushpa-multiplier ${multiplier >= 10 ? "pushpa-pink" : multiplier >= 2 ? "pushpa-purple" : "pushpa-blue"
                }`}
            >
              {multiplier.toFixed(2)}x
            </span>
          ))}
        </div>

      </div>
      {/* History Button (Opens Dropdown)
        <button
          className="pushpa-history-button"
          onClick={() => setShowFullHistory(true)}
        >
          <FaHistory />
          <FaCaretDown className="pushpa-dropdown-icon" />
        </button> */}
      {/* <button className="test-button" onClick={addMultiplier}>Add Random Multiplier</button> */}
    </div>
  );
};

export default MultiplierHistory;
