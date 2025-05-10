import { useState } from "react";
import "./CoinFlip.css";
import { GameHeader } from "../../index";

const HeadTails = () => {
  const [side, setSide] = useState(""); // Track heads or tails
  const [animating, setAnimating] = useState(false); // Track animation state
  const [result, setResult] = useState("");

  const flipCoin = () => {
    if (animating) return; // Prevent multiple clicks
    setAnimating(true);

    const random = Math.random();
    const newSide = random < 0.5 ? "heads" : "tails";
    setSide(newSide);

    setTimeout(() => {
      setResult(newSide.toUpperCase());
      setAnimating(false);
    }, 2900); // Delay until animation completes
  };

  return (
    <div>
      <GameHeader />
      <div className="container">
        <div id="coin" className={animating ? `animate-${side}` : ""}>
          <div id="heads" className="heads"></div>
          <div id="tails" className="tails"></div>
        </div>
        <button onClick={flipCoin} disabled={animating}>
          Flip the Coin
        </button>
        <p>
          <span id="status">{result}</span>
        </p>
      </div>
    </div>
  );
};

export default HeadTails;
