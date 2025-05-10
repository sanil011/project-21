import { useState, useEffect, useRef } from "react";
import "./MultiplierHistory.css"; // Import CSS file
import { ArrowDropDown, Restore, Close } from "@mui/icons-material";
import PropTypes from "prop-types";
import api from "../../../../services/api";
const MultiplierHistory = ({ isPlaneCrashed }) => {
  const [multipliers, setMultipliers] = useState([]);
  const [showFullHistory, setShowFullHistory] = useState(false);
  const containerRef = useRef(null);
  const [maxVisible, setMaxVisible] = useState(10);
  const prevIsPlaneCrashed = useRef(isPlaneCrashed);

  const fetchLatestMultiplier = async (fetchAll = false) => {
    try {

      const response = await api.get("/api/v1/virtual-games/aviator/getMultiplierHistory?gameName=aviator")

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
      setMultipliers((prev) => [1.0, ...prev]);
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
      }, 500);
    }
    prevIsPlaneCrashed.current = isPlaneCrashed;
  }, [isPlaneCrashed]);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const itemWidth = 50; // Approximate width of each multiplier
        const count = Math.floor(containerWidth / itemWidth);
        setMaxVisible(count);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, [multipliers]);

  return (
    <div className="history-container">
      {/* Full History (Overlaps the Row, Keeps Button Visible) */}
      {showFullHistory && (
        <div className="full-history">
          <div className="full-history-header">
            <h3>ROUND HISTORY</h3>
            <button
              className="close-button"
              onClick={() => setShowFullHistory(false)}
            >
              <Close />
            </button>
          </div>
          <div className="history-grid">
            {multipliers.map((multiplier, index) => (
              <span
                key={index}
                className={`multiplier ${multiplier >= 10
                  ? "pink"
                  : multiplier >= 2
                    ? "purple"
                    : "blue"
                  }`}
              >
                {multiplier.toFixed(2)}x
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Top Row (Remains Clickable) */}
      <div className="multiplier-container" ref={containerRef}>
        <div className={`multipliers ${showFullHistory ? "blurred" : ""}`}>
          {multipliers.slice(0, maxVisible).map((multiplier, index) => (
            <span
              key={index}
              className={`multiplier ${multiplier >= 10 ? "pink" : multiplier >= 2 ? "purple" : "blue"
                }`}
            >
              {multiplier.toFixed(2)}x
            </span>
          ))}
        </div>
      </div>
      {/* History Button (Opens Dropdown) */}
      <button
        className="history-button"
        onClick={() => setShowFullHistory(true)}
      >
        <Restore style={{ fontSize: 22 }}/>
        <ArrowDropDown style={{ fontSize: 22 }} />
      </button>
    </div>
  );
};

MultiplierHistory.propTypes = {
  isPlaneCrashed: PropTypes.bool.isRequired,
};

export default MultiplierHistory;
