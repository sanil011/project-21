import { useState, useEffect } from "react";
import overviewBackground from "./assets/overview-background.png";
import { NotepadText } from 'lucide-react';

import GameHeader from "../../common/game-header/GameHeader";
import BetPanel from "./components/BetPanel";
import { Box } from "@mui/material";
import CountdownTimer from "./components/countDownTimer";
import myHistory from "./assets/my-history.png";
import { useDispatch, useSelector } from "react-redux";
import useGetCurrentGameDetails from "./hook/useGetCurrentGameDetails";
import { SET_DICE_GAME_HISTORY, RESET_DICE_PLACED_BET, SET_DICE_BET_HISTORY, alertActions, SET_DICE_PLACED_BET } from "../../../store";
import { getBetHistoryAPI, getCurrentGameResultAPI, submitBet } from "../../../utils/diceApi";
import { fetchUserBalance } from "../../../services/common";
import { userDataActions } from "../../../store";
import HistoryTable from "./components/historyTable";
import GameHistoryTable from "./components/game-history-table";
import Dice1 from "./assets/dice1.gif";
import Dice2 from "./assets/dice2.gif";
import HowToPlayModal from "../../common/how-to-play/HowToPlayModal";
import './Dice.css';
import GoldCross from "./background-dice/GoldCross";
import { D1, D2, D3, D4, D5, D6 } from "./assets/resultGif";
import tokenServices from "../../../services/token-services";

const diceHowToPlayContent = [
  "<strong>1. Each round lasts for 30 seconds:</strong> Place your bets during this time. When time’s up, two dice are rolled to determine the result.",

  "<strong>2. Bet Options:</strong> You can bet on specific numbers, total outcomes, or number properties.",

  "<strong>3. Number Bets:</strong> Choose a specific total from the dice (2 to 12, except 7) to win if the sum matches.",

  "<strong>4. Special Bet - 7:</strong> Bet on total being exactly 7. This is a common midpoint.",

  "<strong>5. Small & Big:</strong> <br/>" +
  "- <strong>Small:</strong> Total is less than 7 (2–6) → Win. <br/>" +
  "- <strong>Big:</strong> Total is more than 7 (8–12) → Win.",

  "<strong>6. Even & Odd:</strong> Bet on whether the total is even or odd.",

  "<strong>7. Payouts:</strong> Vary depending on the odds of the bet type. Riskier bets offer higher rewards.",

  "<strong>8. Results:</strong> After the countdown, dice are rolled and winnings (if any) are credited automatically.",

  "<strong>9. Tip:</strong> Use your history tab to review your previous bets and results.",
];

function numberToWord(num) {
  const numToWords = {
    2: 'TWO',
    3: 'THREE',
    4: 'FOUR',
    5: 'FIVE',
    6: 'SIX',
    7: 'SEVEN',
    8: 'EIGHT',
    9: 'NINE',
    10: 'TEN',
    11: 'ELEVEN',
    12: 'TWELVE'
  };

  // Edge case for numbers greater than 7
  if (num == 'More than 7') {
    return 'BIG';
  }

  // Edge case for numbers less than 7
  if (num == 'Less than 7') {
    return 'SMALL';
  }

  // Edge case for odd numbers
  if (num == 'ODD') {
    return 'ODD';
  }

  // Edge case for even numbers
  if (num == 'EVEN') {
    return 'EVEN';
  }

  // Return the word representation if the number is within the predefined list
  return numToWords[num] || 'Number not in range';
}

const resultDice = [D1, D2, D3, D4, D5, D6];

const Dice = () => {

  void useGetCurrentGameDetails()
  const { currentGame, placedBet, currentGameHistory, betHistory } = useSelector(
    (state) => state.dice
  );
  const [message, setMessage] = useState("");
  const [activeModal, setActiveModal] = useState(null);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isBettingClosed, setIsBettingClosed] = useState(false);
  const [currentTab, setCurrentTab] = useState('My History');
  const [betChoice, setBetChoice] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [currentDice, setCurrentDice] = useState({
    dice1: 1,
    dice2: 1,
  });
  const [prevResult, setPrevResult] = useState("");


  const showAlert = (message, severity) => {
    dispatch(
      alertActions.showAlert({
        show: true,
        message,
        severity,
      })
    );
    setTimeout(() => {
      dispatch(alertActions.showAlert());
    }, 4000);
  };

  const numbers = [2, 3, 4, 5, 6, 8, 9, 10, 11, 12];
  const timeRemaining = 30 - Math.floor((new Date() - new Date(currentGame.startTime)) / 1000);

  const toggleDrawer = (newState) => () => {
    // if (timeRemaining < 5) return;
    setOpen(newState);
    setBetChoice("")
  };


  const betPlaced = async (gameOdd, amount) => {
    const betChoice = numberToWord(gameOdd);
    setActiveModal(null);
    const response = await submitBet({
      gameId: currentGame.id,
      amount,
      gameOdd: betChoice,
      userName: tokenServices.getUserName(),
      gameType: "DICE"
    });


    if (response) {
      dispatch({
        type: SET_DICE_PLACED_BET,
        payload: {
          id: currentGame.id,
          odds: betChoice,
        },
      });

      setMessage("Bet placed successfully");
      // showAlert(response.message);
      // setBetPlacedOn(gameOdd);
      setBetChoice("")
    } else {

      setMessage("Unable to place bet");
      // showAlert(response.message, response.severity);
    }
  };

  useEffect(() => {
    if (activeModal === "SUCCESS" || activeModal === "SORRY") {
      setTimeout(() => {
        setActiveModal(null);
      }, 3000);
    }
  }, [activeModal]);


  const handleClick = (val) => {
    setOpen(true);
    setBetChoice(val)
  }

  const getUserBalance = async () => {
    const newBalance = await fetchUserBalance()
    dispatch(userDataActions.updateBalance(newBalance));
  }

  useEffect(() => {
    getUserBalance();
    getCurrentGameResultAPI({ game: "DICE" }).then((res) =>
      dispatch({ type: SET_DICE_GAME_HISTORY, payload: res })
    );
    getBetHistoryAPI({ game: "DICE" }).then((res) =>
      dispatch({ type: SET_DICE_BET_HISTORY, payload: res })
    );
  }, []);

  useEffect(() => {
    if (currentGame?.phase === "BETTING_OPEN") {
      setCurrentDice({
        dice1: "",
        dice2: "",
      });
    }
    if (currentGame?.phase === "FINISHED") {
      getUserBalance();
      getCurrentGameResultAPI({ game: "DICE" }).then((res) =>
        dispatch({ type: SET_DICE_GAME_HISTORY, payload: res })
      );
      getBetHistoryAPI({ game: "DICE" }).then((res) =>
        dispatch({ type: SET_DICE_BET_HISTORY, payload: res })
      );
      let properties = currentGame.result?.[0]?.properties;
      setCurrentDice({
        dice1: properties?.["dice 1"],
        dice2: properties?.["dice 2"],
      });
    }
    if (
      currentGame?.phase === "FINISHED" &&
      Array.isArray(placedBet) &&
      placedBet.length > 0
    ) {
      let isCurrentBet = false;
      for (let i = 0; i < placedBet.length; i++) {
        if (placedBet[i].id === currentGame.id) {
          setPrevResult(currentGame.result?.[0].winningOdd);
          isCurrentBet = true;
          const winners = currentGame.result?.[0].winners;
          if (winners && Object.keys(winners).length > 0) {
            setActiveModal("SUCCESS");
            setPrevResult(currentGame.result?.[0].winningOdd);
            return;
          }
        }
      }
      console.log("201", isCurrentBet)
      if (isCurrentBet) setActiveModal("SORRY");
      dispatch({
        type: RESET_DICE_PLACED_BET,
        payload: null,
      });
    }
  }, [currentGame]);

  useEffect(() => {
    if (message.length > 0) {
      setTimeout(() => {
        setMessage("");
      }, 1500);
    }
  }, [message]);


  return (
    <div className="dice-page">
      <GoldCross />
      <div>
        <GameHeader />
        {message.length > 0 && (
          <div className="dice-message-popup">{message}</div>
        )}

        <div className="dice-header">
          <img src={overviewBackground} className="dice-header-img" alt="Overview" />

          <div className="dice-header-overlay">
            {/* Left Panel */}
            <div className="dice-left-panel">
              <button
                onClick={() => setShowModal(true)}
                className="dice-how-to-play-button"
              >
                <NotepadText size={16} />
                <h1 className="dice-how-to-play-text">How to play</h1>
              </button>

              {showModal && (
                <HowToPlayModal
                  content={diceHowToPlayContent}
                  onClose={() => setShowModal(false)}
                />
              )}

              <h1 className="dice-section-title">Dice</h1>

              <div className="dice-history-bubbles">
                {currentGameHistory?.length > 0 &&
                  currentGameHistory.map((history, id) => (
                    <div key={id} className="dice-history-bubble">
                      {+history.properties["dice 1"] + +history.properties["dice 2"]}
                    </div>
                  ))}
              </div>
            </div>

            {/* Right Panel */}
            <div className="dice-right-panel">
              <h1 className="dice-timer-label">Time Remaining</h1>
              <CountdownTimer timeRemaining={timeRemaining} />
              <h1 className="dice-timer-id text-sm">{currentGame.id}</h1>
            </div>
          </div>
        </div>
        {/* Countdown Animation when under 6 seconds
        {timeRemaining > -1 && timeRemaining < 6 && (
          <div className="dice-timer-popup">
            <div className="dice-timer-box">{0}</div>
            <div className="dice-timer-box">{timeRemaining}</div>
          </div>
        )} */}

        <div>
          <div className="dice-wrapper">
            {/* LEFT Dice */}
            <div className="dice-ring dice-left flex justify-center items-center">
              <div className="dice-inner">
                {currentGame?.result?.length > 0 ? <img src={currentGame?.result ? resultDice[currentGame?.result[0].properties["dice 1"] - 1] : resultDice[0]} alt="Dice 1" /> : <img src={Dice1} alt="Dice 1" />}
              </div>
            </div>

            {/* RIGHT Dice */}
            <div className="dice-ring dice-right flex justify-center items-center">
              <div className="dice-inner">
                {currentGame?.result?.length > 0 ? <img src={currentGame?.result ? resultDice[currentGame?.result[0].properties["dice 2"] - 1] : resultDice[0]} alt="Dice 2" /> : <img src={Dice2} alt="Dice 2" />}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            {activeModal === "SUCCESS" ? (
              <div className="text-[#3CB043] text-base font-semibold">YOU WON</div>
            ) : activeModal === "SORRY" ? (
              <div className="text-[red] text-base font-semibold">YOU LOOSE</div>
            ) : (
              ""
            )}
          </div>
          <div className="dice-bet-container">
            <div className="bet-options">
              {/* MORE THAN 7 */}
              <div className="bet-option-group">
                <div className="bet-btn-label-row">
                  <button
                    onClick={() => handleClick("More than 7")}
                    className={`bet-btn ${betChoice === 'More than 7' ? 'active' : ''}`}
                  >
                    x1.96
                  </button>
                </div>
                <div className="bet-label">
                  <span className="label-title">OVER</span>
                  <span className="label-arrow">→</span>
                  <span className="label-values">8 9 10 11 12</span>
                </div>
              </div>

              {/* EQUAL TO 7 */}
              <div className="bet-option-group">
                <div className="bet-btn-label-row">
                  <button
                    onClick={() => handleClick("7")}
                    className={`bet-btn ${betChoice === '7' ? 'active' : ''}`}
                  >
                    x8.82
                  </button>
                </div>
                <div className="bet-label">
                  <span className="label-title">EQUAL</span>
                  <span className="label-arrow">→</span>
                  <span className="label-values">7</span>
                </div>
              </div>

              {/* LESS THAN 7 */}
              <div className="bet-option-group">
                <div className="bet-btn-label-row">
                  <button
                    onClick={() => handleClick("Less than 7")}
                    className={`bet-btn ${betChoice === 'Less than 7' ? 'active' : ''}`}
                  >
                    x1.96
                  </button>
                </div>
                <div className="bet-label">
                  <span className="label-title">UNDER</span>
                  <span className="label-arrow">→</span>
                  <span className="label-values">2 3 4 5 6</span>
                </div>
              </div>
            </div>

            <div className="number-grid">
              {numbers.map((db) => (
                <div
                  onClick={() => handleClick(db)}
                  className={`number-tile ${betChoice === db ? 'active' : ''}`}
                  key={db}
                >
                  {db}
                </div>
              ))}
            </div>

            <div className="even-odd-container">
              <h1
                onClick={() => handleClick("EVEN")}
                className={`even-odd even ${betChoice === 'EVEN' ? 'active' : ''}`}
              >
                Even
              </h1>
              <h1
                onClick={() => handleClick("ODD")}
                className={`even-odd odd ${betChoice === 'ODD' ? 'active' : ''}`}
              >
                Odd
              </h1>
            </div>
          </div>
        </div>

        <Box className="dice-tab-container">
          <Box
            className={`dice-tab ${currentTab === "Game History" ? "dice-tab-active" : "dice-tab-inactive"}`}
            onClick={() => setCurrentTab("Game History")}
          >
            Game History
          </Box>
          <Box
            className={`dice-tab ${currentTab === "My History" ? "dice-tab-active" : "dice-tab-inactive"}`}
            onClick={() => setCurrentTab("My History")}
          >
            My History
          </Box>
        </Box>

        <Box className="dice-history-wrapper">
          {currentTab === "My History" &&
            (betHistory.bets.length > 0 ? (
              <HistoryTable bets={betHistory.bets} />
            ) : (
              <img src={myHistory} alt="No Data" />
            ))}
          {currentTab === "Game History" &&
            (currentGameHistory.length > 0 ? (
              <GameHistoryTable data={currentGameHistory} />
            ) : (
              <img src={myHistory} alt="No Data" />
            ))}
        </Box>

      </div>
      <BetPanel
        betChoice={betChoice}
        heading={"Dice"}
        open={open && !isBettingClosed}
        toggleDrawer={toggleDrawer}
        submitBet={betPlaced}
      />

    </div>
  );

}

export default Dice