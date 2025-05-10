import "./AutoCashOut.css";
import { cn } from "../../../../utils/utils";
import CancelIcon from "../icon/cancel";
const AutoCashOut = ({ enabled, setEnabled, cashoutValue, setCashoutValue, isGameInProgress, isBetPlaced }) => {

  // Toggles Auto Cash Out switch, but prevents changes while the game is in progress
  const toggleSwitch = () => {
    if (!isGameInProgress && !isBetPlaced) {
      setEnabled(!enabled);
    }
  };

  // Handles user input for cashout value, ensuring only valid numbers are entered
  const handleInputChange = (e) => {
    let value = e.target.value;

    // Allows only numbers and a single decimal point, while allowing empty input for editing
    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setCashoutValue(value);
    }
  };

  // Validates the input when the user leaves the input field
  const handleBlur = () => {
    if (cashoutValue === "" || isNaN(parseFloat(cashoutValue)) || parseFloat(cashoutValue) < 1.01) {
      // Reset to default value if input is invalid
      setCashoutValue("1.01");
    } else {
      // Ensure the value has two decimal places
      setCashoutValue(parseFloat(cashoutValue).toFixed(2));
    }
  };

  // Resets the cashout value to 1.01 but prevents changes during an active game
  const resetCashout = () => {
    if (!isGameInProgress) {
      setCashoutValue("1.01");
    }
  };

  return (
    <div className={`auto-cashout justify-between w-[50%] ${isGameInProgress || isBetPlaced ? "disabled" : ""}`}>
      <span className="label text-xs font-light">Auto Cash Out</span>

      {/* Toggle switch to enable/disable Auto Cash Out */}
      <label className="switch">
        <input type="checkbox" checked={enabled} onChange={toggleSwitch} disabled={isGameInProgress || isBetPlaced} />
        <span className="slider"></span>
      </label>

      {/* Cashout input box (only editable when enabled and game is not in progress) */}
      <div className={cn('cashout-box | border-[1px] overflow-hidden bg-black rounded-full w-12 pr-1 flex items-center justify-between', enabled ? "enabled" : "")}>
        <input
          type="text"
          className="cashout-input | text-center text-xs bg-transparent  outline-none text-white w-8 border-none"
          value={cashoutValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          disabled={!enabled || isGameInProgress || isBetPlaced}
        />

        {/* Reset button to restore default value (disabled during an active game) */}
        <button className="bg-transparent" onClick={resetCashout} disabled={isGameInProgress}>
          <CancelIcon color={!enabled ? "#555555" :"#99a1af"}
          />
        </button>
      </div>
    </div>
  );
};

export default AutoCashOut;

