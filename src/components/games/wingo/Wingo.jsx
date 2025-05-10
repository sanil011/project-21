import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Article, Circle } from "@mui/icons-material";
import GameHeader from "../../common/game-header/GameHeader";
import BetPanel from "../../common/bet-panel/BetPanel";
import {
  activeClock,
  unactiveClock,
  overviewBackground,
  myHistory,
  coinMixZero,
  coinOne,
  coinTwo,
  coinThree,
  coinFour,
  coinMixFive,
  coinSix,
  coinSeven,
  coinEight,
  coinNine,
} from "./assets";
import tickSound from './assets/first-sec.mp3';
import { alertActions, betChoiceActions } from "../../../store";
import { databaseService } from "../../../utils";
import CountdownTimer from "../Dice/components/countDownTimer";
import HowToPlayModal from "../../common/how-to-play/HowToPlayModal";
import ResultModal from "./result-modal/ResultModal";

const gameTimeSlots = [30, 60, 120, 180];
const gameOverviewHistory = [
  coinMixZero,
  coinOne,
  coinTwo,
  coinThree,
  coinMixFive,
];
const gameCoins = [
  coinMixZero,
  coinOne,
  coinTwo,
  coinThree,
  coinFour,
  coinMixFive,
  coinSix,
  coinSeven,
  coinEight,
  coinNine,
];
const winners = [
  "ZERO",
  "ONE",
  "TWO",
  "THREE",
  "FOUR",
  "FIVE",
  "SIX",
  "SEVEN",
  "EIGHT",
  "NINE",
];
const digitMap = {
  ZERO: coinMixZero,
  ONE: coinOne,
  TWO: coinTwo,
  THREE: coinThree,
  FOUR: coinFour,
  FIVE: coinMixFive,
  SIX: coinSix,
  SEVEN: coinSeven,
  EIGHT: coinEight,
  NINE: coinNine,
};
const colorMap = {
  RED: "bg-red-500",
  GREEN: "bg-green-500",
  VIOLET: "bg-purple-500",
};
const quantityOptions = [1, 5, 10, 20, 50, 100];
const howToPlayContent = [
  "<strong>1 minute = 1 issue</strong>, 45 seconds to order, 15 seconds waiting for the draw. It opens all day. Total issues per day: <strong>1440</strong>.",
  "If you spend 100 to trade, after a 2% service fee, your contract amount is <strong>98</strong>.",
  "<strong>1. Select green:</strong> if the result shows 1,3,7,9 → get <strong>98 × 2 = 196</strong>. If result is 5 → get <strong>98 × 1.5 = 147</strong>.",
  "<strong>2. Select red:</strong> if the result shows 2,4,6,8 → get <strong>98 × 2 = 196</strong>. If result is 0 → get <strong>98 × 1.5 = 147</strong>.",
  "<strong>3. Select violet:</strong> if result is 0 or 5 → get <strong>98 × 4.5 = 441</strong>.",
  "<strong>4. Select number:</strong> if result matches your selected number → get <strong>98 × 9 = 882</strong>.",
  "<strong>5. Select big:</strong> if result is 5,6,7,8,9 → get <strong>98 × 2 = 196</strong>.",
  "<strong>6. Select small:</strong> if result is 0,1,2,3,4 → get <strong>98 × 2 = 196</strong>."
];

const Wingo = () => {
  const [open, setOpen] = useState(false);
  const [isBettingClosed, setIsBettingClosed] = useState(false);
  const [betPlacedOn, setBetPlacedOn] = useState("");
  const [currentTimeSlot, setCurrentTimeSlot] = useState(30);
  const [currentTime, setCurrentTime] = useState(30);
  const [currentGame, setCurrentGame] = useState({});
  const [currentTab, setCurrentTab] = useState("Game History");
  const [latestResults, setLatestResults] = useState([]);
  const [betHistory, setBetHistory] = useState([]);
  const betChoice = useSelector((store) => store.betChoice);
  const [openModal, setOpenModal] = useState(false);
  const [openHowToPlayModal, setOpenHowToPlayModal] = useState(false);

  const [resultType, setResultType] = useState(""); // "SUCCESS" or "SORRY"
  const [lotteryResult, setLotteryResult] = useState(""); // actual result
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const tickSoundRef = useRef(null);

  const { userName } = useSelector((store) => store.userData);

  const dispatch = useDispatch();

  const toggleDrawer = (newState) => () => {
    setOpen(newState);
  };

  const changeBetChoice = (newBetChoice) => {
    dispatch(betChoiceActions.updateBetChoice(newBetChoice));
  };

  const checkBetResult = (gameResult, userBet) => {
    const resultIndex = winners.indexOf(gameResult);

    if (userBet === gameResult) return true;

    if (userBet === "BIG" && resultIndex >= 5) return true;
    if (userBet === "SMALL" && resultIndex < 5) return true;

    if (userBet === "RED" && resultIndex % 2 === 0) return true;
    if (userBet === "GREEN" && resultIndex % 2 !== 0) return true;

    if (userBet === "VIOLET" && (resultIndex === 0 || resultIndex === 5))
      return true;

    return false;
  };

  const submitBet = async (gameOdd, amount) => {
    const response = await databaseService.submitBet({
      ...currentGame,
      amount,
      gameOdd,
      userName,
    });

    // Check for errors in the response
    if (response && !response.error) {
      // If no error, show the success alert and handle the bet placement
      showAlert(response.message);
      setBetPlacedOn(gameOdd);
      console.log(response);
      changeBetChoice("");
    } else {
      // If there is an error, show the error alert
      showAlert(response.message, response.severity);
    }
  };

  const getLatestResults = async () => {
    const response = await databaseService.getLatestResults(
      `LUCKY_9_${currentTimeSlot}`
    );
    if (response.data && response.data.length > 0) {
      setLatestResults(response.data);
    } else {
      showAlert(response.message, response.severity);
    }
  };

  const getBetHistory = async () => {
    const response = await databaseService.getBetHistory(
      `LUCKY_9_${currentTimeSlot}`
    );
    if (response.data) {
      setBetHistory(response.data);
    } else {
      showAlert(response.message, response.severity);
    }
  };

  const getCurrentGame = async () => {
    try {
      const response = await databaseService.getCurrentGame(
        `LUCKY_9_${currentTimeSlot}`
      );

      if (response.id) {
        setCurrentTime(response.remainingTime);
        setIsBettingClosed(response.phase === "BETTING_CLOSED");
        setCurrentGame({
          gameId: response.id,
          gameType: response.gameType,
        });

        startTimer(response.remainingTime); // Start the countdown timer
      } else {
        showAlert(response.message, response.severity);
      }
    } catch (error) {
      console.error("Error fetching game data:", error);
    }
  };

  const fetchNewGameData = async () => {
    try {
      const newResponse = await databaseService.getCurrentGame(
        `LUCKY_9_${currentTimeSlot}`
      );

      if (newResponse.id) {
        setCurrentGame({
          gameId: newResponse.id,
          gameType: newResponse.gameType,
        });
        setCurrentTime(newResponse.remainingTime);
        setIsBettingClosed(newResponse.phase !== "BETTING_OPEN");

        if (newResponse.phase === "BETTING_OPEN") {
          setCurrentTime(newResponse.remainingTime);
          getLatestResults();
          getBetHistory();
        }
        else if (newResponse.phase === "FINISHED" && betPlacedOn) {
          const result = checkBetResult(newResponse.result[0].winningOdd, betPlacedOn);

          // -m added this for modal
          const resultOdd = newResponse.result?.[0]?.winningOdd;
          // console.log("Winning Odd:");

          if (resultOdd) {
            setLotteryResult(resultOdd);
            const isWin = checkBetResult(resultOdd, betPlacedOn);

            if (isWin) {
              setResultType("SUCCESS");
            } else {
              setResultType("SORRY");
            }

            setOpenModal(true); // <-- this was missing
            setBetPlacedOn(""); // reset
          }

        }
      } else {
        showAlert(newResponse.message, newResponse.severity);
        clearInterval(interval);
      }
    } catch (error) {
      console.error("Error fetching new game data:", error);
    }
  };

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

  // Timer logic
  // Timer logic
  let interval;
  const startTimer = (initialTime) => {
    if (interval) clearInterval(interval); // Ensure only one interval is running

    setCurrentTime(initialTime);
    interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev <= 5) {
          fetchNewGameData(); // Fetch new game data when < 5 seconds left
        }
        if (prev <= 4 && prev > 0 && tickSoundRef.current && !document.hidden) {
          // Reset and play the sound
          tickSoundRef.current.currentTime = 0;
          tickSoundRef.current.play().catch((err) => {
            console.error("Tick sound error:", err);
          });
        }
        return prev > 0 ? prev - 1 : prev;
      });
    }, 1000);
  };


  const getColorFromResult = (result) => {
    const index = winners.indexOf(result);

    if (index === 0 || index === 5) return "VIOLET";
    if (index % 2 === 0) return "RED";
    return "GREEN";
  };

  useEffect(() => {
    getCurrentGame();
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentTimeSlot, betPlacedOn]);

  useEffect(() => {
    getLatestResults();
    getBetHistory();
  }, [currentTimeSlot]);

  useEffect(() => console.log(betPlacedOn), [betPlacedOn])

  useEffect(() => {
    tickSoundRef.current = new Audio(tickSound);
  }, []);

  return (
    <div className="relative w-full">
      <GameHeader />

      {/* Time Slots */}
      <Box
        className="mx-3 bg-[#374992] rounded-xl grid grid-cols-4 place-items-center mt-3"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {gameTimeSlots.map((timeSlot) => (
          <Box
            key={timeSlot}
            onClick={() => setCurrentTimeSlot(timeSlot)}
            className={`text-center text-xs py-1.5 cursor-pointer font-semibold w-full flex flex-col items-center rounded-xl ${currentTimeSlot === timeSlot ? "text-white" : "text-[#acafc2]"
              }`}
            style={
              currentTimeSlot === timeSlot
                ? {
                  background: "linear-gradient(to top right, #236bd0, #2aa9f3)",
                  fontFamily: 'Inter, sans-serif',
                }
                : { fontFamily: 'Inter, sans-serif' }
            }
          >
            <img
              src={currentTimeSlot === timeSlot ? activeClock : unactiveClock}
              alt=""
              className="h-12"
            />
            <p className="font-light">Win Go</p>
            <p className="font-normal">{timeSlot}s</p>
          </Box>
        ))}
      </Box>

      {/* Game Overview */}
      <Box className="mx-3 my-3 relative" sx={{ fontFamily: "'Inter', sans-serif" }}>
        <img src={overviewBackground} alt="" className="h-32" />
        <Box className="grid grid-cols-2 h-full absolute top-0 font-semibold w-full text-white">
          <Box className="h-full w-full p-3 flex flex-col justify-center gap-2">
            <Button
              variant="outlined"
              startIcon={<Article />}
              onClick={() => setOpenHowToPlayModal(true)}
              sx={{
                borderRadius: "50px",
                border: "1px solid #333",
                color: "white",
                width: "100%",
                fontSize: "13px",
                textTransform: "capitalize",
                padding: "2px",
                fontFamily: "'Inter', sans-serif", // <- here too for safety
              }}
            >
              How To Play
            </Button>
            {openHowToPlayModal && (
              <HowToPlayModal
                content={howToPlayContent}
                onClose={() => setOpenHowToPlayModal(false)}
              />
            )}

            <h1 className="font-normal text-sm">Win Go {currentTimeSlot}s</h1>

            <Box className="flex gap-1">
              {gameOverviewHistory.map((overviewHistory) => (
                <img
                  key={overviewHistory}
                  src={overviewHistory}
                  className="h-6.5"
                />
              ))}
            </Box>
          </Box>

          <Box className="h-full w-full flex flex-col justify-evenly items-end text-lg py-5 pr-3">
            <h1 className="text-xs text-right text-white"
              style={{ textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.4)' }}>
              Time Remaining</h1>
            <CountdownTimer timeRemaining={currentTime} />
            <h1 className="text-xs text-right text-white"
              style={{ textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.4)' }}>
              {currentGame.gameId?.split("_").slice(-2).join("_")}
            </h1>
          </Box>
        </Box>
      </Box>

      {/* Game Panel */}
      <Box className="bg-[#2b3270] p-2 mx-3 rounded-xl relative overflow-hidden">
        {/* Overlay Timer when betting is closed */}
        <Box
          className={`bg-[#191c3ac8] h-full ${isBettingClosed ? "flex" : "hidden"
            } w-full absolute top-0 left-0 z-50 flex justify-center items-center gap-3 text-[150px] text-white font-bold leading-none`}
        >
          <Box className="bg-[#374992] text-[#61a9ff] px-6 py-6 rounded-xl">0</Box>
          <Box className="bg-[#374992] text-[#61a9ff] px-6 py-6 rounded-xl">
            {currentTime >= 0 ? currentTime : 0}
          </Box>
        </Box>

        {/* Color Bet Buttons */}
        <Box className="grid grid-cols-3 gap-4" onClick={toggleDrawer(true)}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#17b15e',
              '&:hover': { backgroundColor: '#149e53' },
              borderRadius: "10px",
              borderTopLeftRadius: 0,
              borderBottomRightRadius: 0,
              textTransform: "capitalize",
              fontSize: "0.9em",
            }}
            onClick={() => changeBetChoice("GREEN")}
          >
            Green
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#9b48db',
              '&:hover': { backgroundColor: '#8a3fbe' },
              borderRadius: "5px",
              textTransform: "capitalize",
              fontSize: "0.9em",
            }}
            onClick={() => changeBetChoice("VIOLET")}
          >
            Violet
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#d23838',
              '&:hover': { backgroundColor: '#bb2f2f' },
              borderRadius: "10px",
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 0,
              textTransform: "capitalize",
              fontSize: "0.9em",
            }}
            onClick={() => changeBetChoice("RED")}
          >
            Red
          </Button>
        </Box>

        {/* Coins Grid */}
        <Box
          className="grid grid-cols-5 gap-2 bg-[#22275b] mt-4 p-2 rounded-xl"
          onClick={toggleDrawer(true)}
        >
          {gameCoins.map((coin, index) => (
            <img
              key={coin}
              src={coin}
              className="cursor-pointer"
              onClick={() => changeBetChoice(index)}
            />
          ))}
        </Box>

        <Box className="w-full px-1 mt-4">
          <Box className="flex justify-between gap-1 w-full flex-wrap">
            <Box
              className="flex-1 min-w-[65px] text-center px-1 py-2 border border-red-500 text-red-500 rounded-lg cursor-pointer text-[2.5vw] sm:text-[12px] md:text-[13px] lg:text-[14px]"
              style={{ fontWeight: 500 }}
              onClick={() =>
                setSelectedQuantity(
                  quantityOptions[Math.floor(Math.random() * quantityOptions.length)]
                )
              }
            >
              Random
            </Box>

            {quantityOptions.map((option, index) => (
              <Box
                key={index}
                className={`flex-1 min-w-[0] text-center py-2 rounded-lg cursor-pointer text-white text-[2.5vw] sm:text-[12px] md:text-[13px] lg:text-[14px] ${selectedQuantity === option ? "bg-[#17b15e]" : "bg-[#1e255c]"
                  }`}
                style={{ fontWeight: 500 }}
                onClick={() => setSelectedQuantity(option)}
              >
                X{option}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Big/Small Section */}
        <Box
          className="flex w-full mt-4 items-center font-semibold text-xl text-center text-white"
          onClick={toggleDrawer(true)}
        >
          <Box
            className="w-1/2 py-2 rounded-l-full bg-orange-400 cursor-pointer"
            onClick={() => changeBetChoice("BIG")}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <h1 className="text-s font-medium">Big</h1>
          </Box>

          <Box
            className="w-1/2 py-2 rounded-r-full bg-blue-400 cursor-pointer"
            onClick={() => changeBetChoice("SMALL")}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <h1 className="text-s font-medium">Small</h1>
          </Box>
        </Box>
      </Box>


      {/* History Box */}
      <Box className="grid grid-cols-2 gap-3 mx-3 my-5">
        <Box
          className={`${currentTab === "Game History"
            ? "bg-[#2aa1f3] text-white"
            : "bg-[#2b3270] text-gray-400"
            } rounded-lg flex items-center justify-center py-2 cursor-pointer text-center font-semibold font-[Inter,sans-serif]`}
          onClick={() => setCurrentTab("Game History")}
        >
          <h1 className="text-sm">Game History</h1>
        </Box>

        <Box
          className={`${currentTab === "My History"
            ? "bg-[#2aa1f3] text-white"
            : "bg-[#2b3270] text-gray-300"
            } rounded-lg flex items-center justify-center py-2 cursor-pointer text-center text-lg font-semibold font-[Inter,sans-serif]`}
          onClick={() => setCurrentTab("My History")}
        >
          <h1 className="text-sm">My History</h1>
        </Box>

      </Box>

      <div className="w-[95%] mx-auto">
        {currentTab === "Game History" ? (
          latestResults.length > 0 ? (
            <TableContainer
              component={Paper}
              sx={{
                width: "98%",
                overflow: "hidden",
                margin: "auto",
                backgroundColor: "transparent",
                borderRadius: "10px",
                marginBottom: "12px"
              }}
            >
              <Table
                aria-label="simple table"
                sx={{
                  backgroundColor: "#2b3270",
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <TableHead>
                  <TableRow
                    sx={{
                      "& td, & th": { border: 0 },
                      backgroundColor: "#374992",
                    }}
                  >
                    <TableCell
                      sx={{ color: "white", fontSize: "15px" }}
                      align="center"
                    >
                      Period
                    </TableCell>
                    <TableCell
                      sx={{ color: "white", fontSize: "15px" }}
                      align="left"
                    >
                      Number
                    </TableCell>
                    <TableCell
                      sx={{ color: "white", fontSize: "15px" }}
                      align="center"
                    >
                      Big Small
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontSize: "1em",
                      }}
                      align="center"
                    >
                      Color
                    </TableCell>
                  </TableRow>
                </TableHead>


                <TableBody>
                  {latestResults.map((result) => (
                    <TableRow
                      key={result.gameId}
                      sx={{ "& td, & th": { border: 0 } }}
                    >
                      <TableCell
                        align="center"
                        component="th"
                        scope="row"
                        sx={{ color: "white", border: "1px solid white", fontSize: '12px', padding: "8px", }}
                      >
                        {result.gameId.split("_").slice(-2).join("_")}
                      </TableCell>

                      <TableCell align="center" sx={{ color: "white", fontSize: '12px', padding: "8px", }}>
                        <img
                          src={gameCoins[winners.indexOf(result.winner)]}
                          className="h-7 mx-auto"
                        />
                      </TableCell>

                      <TableCell align="center" sx={{ color: "white", fontSize: '12px', padding: "8px", }}>
                        {winners.indexOf(result.winner) > 4 ? "Big" : "Small"}
                      </TableCell>

                      <TableCell
                        align="center"
                        sx={{
                          display:
                            winners.indexOf(result.winner) === 0 ||
                              winners.indexOf(result.winner) === 5
                              ? "flex"
                              : "block",
                          justifyContent: "center",
                          gap: "5px",
                          padding: "8px",
                        }}
                      >
                        <Circle
                          color={
                            winners.indexOf(result.winner) % 2 === 0
                              ? "error"
                              : "success"
                          }
                          sx={{ fontSize: "15px" }}
                        />
                        {(winners.indexOf(result.winner) === 0 ||
                          winners.indexOf(result.winner) === 5) && (
                            <Circle color="secondary" sx={{ fontSize: "15px" }} />
                          )}
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>


              </Table>
            </TableContainer>
          ) : (
            <Box className="bg-[#2b3270] mx-3 mb-3 rounded-xl overflow-hidden">
              <img src={myHistory} alt="No Data" />
            </Box>
          )
        ) : betHistory.length > 0 ? (
          <TableContainer
            component={Paper}
            sx={{
              width: "98%",
              overflow: "hidden",
              margin: "auto",
              backgroundColor: "transparent",
              borderRadius: "10px",
              marginBottom: "12px"
            }}
          >
            <Table
              aria-label="simple table"
              sx={{
                backgroundColor: "#2b3270",
                width: "100%",
              }}
            >
              <TableHead>
                <TableRow
                  sx={{ "& td, & th": { border: 0 }, backgroundColor: "#374992" }}
                >
                  <TableCell
                    sx={{ color: "white", fontSize: "15px" }}
                    align="center"
                  >
                    Trans. Id
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", fontSize: "15px" }}
                    align="center"
                  >
                    Odd
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", fontSize: "15px" }}
                    align="center"
                  >
                    Amount
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontSize: "1em",
                    }}
                    align="center"
                  >
                    Bet
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontSize: "1em",
                    }}
                    align="center"
                  >
                    Win
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {betHistory.map((history) => (
                  <TableRow
                    key={history.betId}
                    sx={{ "& td, & th": { border: 0 } }}
                  >
                    <TableCell
                      align="center"
                      component="th"
                      scope="row"
                      sx={{ color: "white", border: "1px solid white", padding: "8px" }}
                    >
                      {history.betId}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white", padding: "8px", fontSize: '12px' }}>
                      {winners.indexOf(history.odd) >= 0 ? (
                        <img
                          src={gameCoins[winners.indexOf(history.odd)]}
                          className="h-7 mx-auto"
                        />
                      ) : (
                        history.odd[0] + history.odd.slice(1).toLowerCase()
                      )}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white", padding: "8px", fontSize: '12px' }}>
                      {history.amount}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white", padding: "8px", fontSize: '12px' }}>
                      <img
                        src={gameCoins[winners.indexOf(history.gameWinner)]}
                        className="h-7 mx-auto"
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white", padding: "8px", fontSize: '12px' }}>
                      {history.won ? "Win" : "Loss"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box className="bg-[#2b3270] mx-3 mb-3 rounded-xl overflow-hidden">
            <img src={myHistory} alt="No Data" />
          </Box>
        )}
      </div>
      {/* Bet Panel */}
      <BetPanel
        betChoice={betChoice}
        heading={"Wingo"}
        open={open && !isBettingClosed}
        toggleDrawer={toggleDrawer}
        submitBet={submitBet}
        selectedQuantity={selectedQuantity}
        setSelectedQuantity={setSelectedQuantity}
      />
      {/* -m added this modal */}
      {openModal && (
        <ResultModal
          type={resultType}
          odds={betPlacedOn}
          time={currentGame?.gameId?.split("_")?.[2]}
          onClose={() => {
            setOpenModal(false);
            setResultType("");
          }}
          lotteryResult={
            <>
              <div
                className={`mr-2 px-2 py-1 rounded text-white text-xs flex items-center justify-center ${colorMap[getColorFromResult(lotteryResult)]
                  }`}
              >
                {getColorFromResult(lotteryResult)}
              </div>
              <img
                src={digitMap[lotteryResult]}
                alt={lotteryResult}
                className="w-[30px] h-[30px]"
              />
            </>
          }
        />
      )}
    </div>

  );
};

export default Wingo;
