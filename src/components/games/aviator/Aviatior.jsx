

import {
  Box
} from "@mui/material";
import { useEffect, useState } from "react";
import BetsTable from "./components/betsTable";
import { cn } from "../../../utils/utils";
import "./Aviator.css"
import UnityGame from "./game-box/UnityGame";
import MultiplierHistory from "./multiplier-history/MultiplierHistory";
import AutoPlayButton from "./auto-play-button/AutoPlayButton";
import AutoCashOut from "./auto-cashout/AutoCashout";
import WinPopup from "./win-message/WinPopup";
import PlusIcon from "./icon/plus";
import SubtractIcon from "./icon/subtract";
import api from "../../../services/api"
import Header from "./header/Header";
import { useSelector } from "react-redux";

const betOptions = [10, 100, 500, 1000];

const Aviatior = () => {
  const { userName } = useSelector((store) => store.userData);

  const [firstBetType, setFirstBetType] = useState("Bet");
  const [secondBetType, setSecondBetType] = useState("Bet");

  const [autoCashoutEnabledFirst, setAutoCashoutEnabledFirst] = useState(false);
  const [autoCashoutEnabledSecond, setAutoCashoutEnabledSecond] = useState(false);

  const [firstBetAmount, setFirstBetAmount] = useState(10);
  const [secondBetAmount, setSecondBetAmount] = useState(10);

  const [autoCashOutFirst, setAutoCashOutFirst] = useState(1.1);
  const [autoCashOutSecond, setAutoCashOutSecond] = useState(1.1);

  const [firstBetPlaced, setFirstBetPlaced] = useState(false);
  const [secondBetPlaced, setSecondBetPlaced] = useState(false);

  const [betPlacedBeforeStartFirst, setBetPlacedBeforeStartFirst] = useState(false);
  const [betPlacedBeforeStartSecond, setBetPlacedBeforeStartSecond] = useState(false);

  //error text 
  const [errorMessage, setErrorMessage] = useState(null);
  const [winMessage, setWinMessage] = useState(null);
  const [encashedAt, setEncashedAt] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const [firstEncashed, setFirstEncashed] = useState(false);
  const [secondEncashed, setSecondEncashed] = useState(false);


  const [historyType, setHistoryType] = useState("All Bets");
  const [allBets, setAllbets] = useState([]);

  // State to store the bets data
  const [myBets, setMyBets] = useState([]);
  const [error, setError] = useState(null);  // Error state

  const [isPlaneCrashed, setIsPlaneCrashed] = useState(false);
  const [multiplier, setMultiplier] = useState(1.0);
  const [musicEnabled, setMusicEnabled] = useState(true);


  // Fetch the bets data when the component mounts
  useEffect(() => {
    const fetchBets = async () => {
      try {
        const data = await api.get("/gamma/lucky9/getUserAviatorHistory?gameName=aviator")
        // Update the state with the fetched data
        setMyBets(data.data);
      } catch (error) {
        // Handle any error that occurs during the fetch
        setError(error.message);
      }
    };

    if (!isPlaneCrashed) {// Call the fetch function
      fetchBets();
    }
  }, [isPlaneCrashed]); // Empty dependency array ensures this runs only once on mount

  const handleBetAmountChange = (betType, action) => {
    const setBetAmount =
      betType === "first" ? setFirstBetAmount : setSecondBetAmount;

    setBetAmount((prev) => {
      let step = 10;

      for (let i = 0; i < betOptions.length; i++) {
        if (
          prev >= betOptions[i] &&
          (i === betOptions.length - 1 || prev < betOptions[i + 1])
        ) {
          step = betOptions[i];
          break;
        }
      }

      if (action === "add") {
        return prev + step;
      } else if (action === "subtract") {
        if (prev > 1000) {
          step = 1000;
        } else if (prev > 500) {
          step = 500;
        } else if (prev > 100) {
          step = 100;
        } else {
          step = 10;
        }

        return Math.max(10, prev - step);
      }

      return prev;
    });
  };

  // Function to update balance using fetch
  const updateBalance = async (amount, gameName = "aviator") => {
    const body = {
      amount,
      userName,
      gameName,
    };
  
    try {
      const storedData = localStorage.getItem("lucky-game-user");
      if (!storedData) {
        alert("User not authenticated. Please log in.");
        return;
      }
  
      const response = await api.post("/gamma/lucky9/updateUserBalance", body); // changed to POST and added body
  
      if (response.status !== 200) {
        throw new Error("Failed to update balance");
      }
  
      const data = response.data;
      console.log("Balance updated successfully:", data);
      return data;
    } catch (error) {
      console.error("Error updating balance:", error);
      throw error;
    }
  };
  

  const handleClickFirst = async () => {

    if (!firstBetPlaced) {
      // 🟢 Placing Bet
      setFirstBetPlaced(true); // Set bet state immediately

      try {
        const gameId = localStorage.getItem("gameId");
        const data = await api.post('/api/v1/virtual-games/submitAviatorBet?gameName=aviator', {
          amount: firstBetAmount,
          gameId,
          userName,
          buttonId: "button" + 1,
          autoCashoutMultiplier: autoCashoutEnabledFirst ? autoCashOutFirst : null // Conditional multiplier
        })

        console.log("Bet API Response:", data);

        if (!data || data.data === false || data.error) {
          setErrorMessage(data?.message || "Wait For Next Round!");
          setFirstBetPlaced(false);
          setTimeout(() => setErrorMessage(null), 3000);
          return;
        }

        // ✅ If API was successful, update game state
        if (!isPlaneCrashed) {
          setBetPlacedBeforeStartFirst(true);
        }
      } catch (error) {
        console.log("Network Error:", error);
        setErrorMessage("Stage Timeout");
        setFirstBetPlaced(false);
        setTimeout(() => setErrorMessage(null), 3000);
      }
    }

    // 🛑 If Bet is Placed but Game is Not Running -> Cancel the Bet
    else if (betPlacedBeforeStartFirst && !isPlaneCrashed) {
      try {
        const gameId = localStorage.getItem("gameId");
        const data = await api.post("/api/v1/virtual-games/cancelBet?gameName=aviator", {
          amount: firstBetAmount,
          gameId,
          userName,
          buttonId: "button" + 1
        })

        console.log("Cancel API Response:", data);

        if (!data || data.data === false || data.error) {
          setErrorMessage(data?.message || "Stage Timeout");
          setTimeout(() => setErrorMessage(null), 3000);
          return;
        }

        // ✅ Successfully canceled bet - Reset state
        setFirstBetPlaced((prev) => !prev);
        setBetPlacedBeforeStartFirst(false);
      } catch (error) {
        console.log("Network Error:", error);
        setErrorMessage("Stage Timeout");
        setTimeout(() => setErrorMessage(null), 3000);
      }
    }

    // 🟠 If Game is Running -> Process Cashout
    else {
      try {
        const data = await api.post("/api/v1/virtual-games/encashAviatorBet?gameName=aviator", {
          firstBetAmount,
          userName,
          buttonId: "button" + 1
        })

        console.log("Cashout API Response:", data);

        if (!data || data.data === false || data.error) {
          setErrorMessage(data?.message || "Stage Timeout");
          setTimeout(() => setErrorMessage(null), 3000);
          return;
        }

        // ✅ Show "WON" if `isEncashed` is true
        if (data.data.ifEncashed === true) {
          setWinMessage(data.data.encashedAmount);
          setEncashedAt(data.data.multiplier)
          setFirstEncashed(true);
          setTimeout(() => {
            // setWinMessage(null);
            setFirstEncashed(false);
          }, 4000);
        }

        // ✅ Successful Cashout - Reset bet states
        setFirstBetPlaced((prev) => !prev);
        // setFirstBetAmount(betOptions[0]);
        setBetPlacedBeforeStartFirst(false);
      } catch (error) {
        console.log("Network Error:", error);
        setErrorMessage("Stage Timeout");
        setTimeout(() => setErrorMessage(null), 3000);
      }
    }
  };

  const handleClickSecond = async () => {
    if (!secondBetPlaced) {
      // 🟢 Placing Bet
      setSecondBetPlaced(true); // Set bet state immediately

      try {
        const gameId = localStorage.getItem("gameId");
        const data = await api.post("/api/v1/virtual-games/submitAviatorBet?gameName=aviator", {
          amount: secondBetAmount,
          gameId,
          userName,
          buttonId: "button" + 2,
          autoCashoutMultiplier: autoCashoutEnabledSecond ? autoCashOutSecond : null
        })

        // const data = await response.json();
        console.log("Bet API Response:", data);

        if (!data || data.data === false || data.error) {
          setErrorMessage(data?.message || "Wait For Next Round!");
          setSecondBetPlaced(false);
          setTimeout(() => setErrorMessage(null), 3000);
          return;
        }

        // ✅ If API was successful, update game state
        if (!isPlaneCrashed) {
          setBetPlacedBeforeStartSecond(true);
        }
      } catch (error) {
        console.log("Network Error:", error);
        setErrorMessage("Stage Timeout");
        setSecondBetPlaced(false);
        setTimeout(() => setErrorMessage(null), 3000);
      }
    }

    // 🛑 If Bet is Placed but Game is Not Running -> Cancel the Bet
    else if (betPlacedBeforeStartSecond && !isPlaneCrashed) {
      try {
        const gameId = localStorage.getItem("gameId");
        const data = await api.post("/api/v1/virtual-games/cancelBet?gameName=aviator", {
          amount: secondBetAmount,
          gameId,
          userName,
          buttonId: "button" + 2
        })

        console.log("Cancel API Response:", data);

        if (!data || data.data === false || data.error) {
          setErrorMessage(data?.message || "Stage Timeout");
          setTimeout(() => setErrorMessage(null), 3000);
          return;
        }

        // ✅ Successfully canceled bet - Reset state
        setSecondBetPlaced((prev) => !prev);
        setBetPlacedBeforeStartSecond(false);
      } catch (error) {
        console.log("Network Error:", error);
        setErrorMessage("Stage Timeout");
        setTimeout(() => setErrorMessage(null), 3000);
      }
    }

    // 🟠 If Game is Running -> Process Cashout
    else {
      try {
        const data = await api.post("/api/v1/virtual-games/encashAviatorBet?gameName=aviator", {
          amount: secondBetAmount,
          userName,
          buttonId: "button" + 2
        })


        console.log("Cashout API Response:", data);

        if (!data || data.data === false || data.error) {
          setErrorMessage(data?.message || "Stage Timeout");
          setTimeout(() => setErrorMessage(null), 3000);
          return;
        }

        // ✅ Show "WON" if `isEncashed` is true
        if (data.data.ifEncashed === true) {
          setWinMessage(data.data.encashedAmount);
          setEncashedAt(data.data.multiplier)
          setSecondEncashed(true);
          setTimeout(() => {
            setSecondEncashed(false);
          }, 4000);
        }

        // ✅ Successful Cashout - Reset bet states
        setSecondBetPlaced((prev) => !prev);
        // setSecondBetAmount(betOptions[0]);
        setBetPlacedBeforeStartSecond(false);
      } catch (error) {
        console.log("Network Error:", error);
        setErrorMessage("Stage Timeout");
        setTimeout(() => setErrorMessage(null), 3000);
      }
    }
  };

  useEffect(() => {
    // 🔹 Auto Cashout Condition
    if (
      isPlaneCrashed &&
      autoCashoutEnabledFirst &&
      autoCashOutFirst > 1 &&
      betPlacedBeforeStartFirst &&
      multiplier >= autoCashOutFirst
    ) {
      handleAutoCashoutFirst();
    }
  }, [multiplier, isPlaneCrashed, autoCashOutFirst]); // for auto

  useEffect(() => {
    // 🔹 Auto Cashout Condition
    if (
      isPlaneCrashed &&
      autoCashoutEnabledSecond &&
      autoCashOutSecond > 1 &&
      betPlacedBeforeStartSecond &&
      multiplier >= autoCashOutSecond
    ) {
      handleAutoCashoutSecond();
    }
  }, [multiplier, isPlaneCrashed, autoCashOutSecond]); // for autoCashOutSecond

  const handleAutoCashoutFirst = () => {
    // ✅ Show "WON" message when auto cashout triggers
    const winAmount = Number((autoCashOutFirst * firstBetAmount).toFixed(2));
    setWinMessage(data.data.encashedAmount);
    setEncashedAt(autoCashOutFirst)
    updateBalance(winAmount);

    // ✅ Reset win message after 3 seconds
    setFirstEncashed(true);
    setTimeout(() => {
      setFirstEncashed(false);
    }, 4000);

    // ✅ Reset bet states
    setFirstBetPlaced(false);
    setBetPlacedBeforeStartFirst(false);
  };

  const handleAutoCashoutSecond = () => {
    // ✅ Show "WON" message when auto cashout triggers
    const winAmount = Number((autoCashOutSecond * secondBetAmount).toFixed(2));
    setWinMessage(data.data.encashedAmount);
    setEncashedAt(autoCashOutSecond);
    updateBalance(winAmount);

    // ✅ Reset win message after 3 seconds
    setSecondEncashed(true);
    setTimeout(() => {
      setSecondEncashed(false);
    }, 4000);

    // ✅ Reset bet states
    setSecondBetPlaced(false);
    setBetPlacedBeforeStartSecond(false);
  };

  //commmon
  useEffect(() => {
    if (!isPlaneCrashed) {
      setMultiplier(0)
      setFirstBetPlaced(false)
      setBetPlacedBeforeStartFirst(false);

      setSecondBetPlaced(false)
      setBetPlacedBeforeStartSecond(false);
    }
  }, [isPlaneCrashed]);


  return (
    <div className="bg-[#111013] min-h-screen -mb-4">
      <Header
        musicEnabled={musicEnabled}
        setMusicEnabled={setMusicEnabled}
      />
      {/* Game History */}
      <Box className=" text-blue-400 text-md font-semibold py-1 mb-1">
        <MultiplierHistory isPlaneCrashed={isPlaneCrashed} />
      </Box>

      {/* Game Box */}
      <Box className="h-fit mx-2 rounded-lg overflow-hidden flex justify-center items-center text-white font-semibold text-2xl">
        <UnityGame
          isPlaneCrashed={isPlaneCrashed}
          setIsPlaneCrashed={setIsPlaneCrashed}
          setLerp={setMultiplier}
          setAllBets={setAllbets}
          musicEnabled={musicEnabled}
        />
        {errorMessage && <div className="global-error show">{errorMessage}</div>}
        {firstEncashed &&(
          <WinPopup
          multiplier={encashedAt}
          amount={winMessage}
          onClose={() => setShowPopup(false)}
          />
        )}
        {secondEncashed &&(
          <WinPopup
          multiplier={encashedAt}
          amount={winMessage}
          onClose={() => setShowPopup(false)}
          />
        )}
      </Box>

      {/* Bet Panel */}
      <Box className="flex flex-col gap-2 my-3 px-2 w-full h-fit font-semibold">
        {/* Panel One */}
        <Box className="bg-[#1f1f1f] rounded-xl  w-full">

          <div className="p-2">
            <Box className=" bg-[black] flex w-8/12 mx-auto mb-3 rounded-full p-[1px]">
              <div
                className={cn('text-sm w-1/2  rounded-full cursor-pointer text-center transition-all font-light',
                  firstBetType === "Bet" ? "bg-[#3d3d3d] text-white" : "text-gray-400 hover:text-red-500"
                )}
                onClick={() => setFirstBetType("Bet")}
              >
                Bet
              </div>
              <div
                className={cn('text-sm w-1/2  rounded-full cursor-pointer text-center transition-all font-light',
                  firstBetType === "Auto" ? "bg-[#3d3d3d] text-white" : "text-gray-400 hover:text-red-500"
                )}
                onClick={() => setFirstBetType("Auto")}
              >
                Auto
              </div>
            </Box>


            {/* /--------------------------------------------------------------/ */}

            <Box className="flex gap-2 w-full">
              <Box className='w-[35%] '>
                <Box     className={`flex gap-2 w-full items-center bg-[#111013] px-2 py-0.5 rounded-full border ${
                  firstBetPlaced ? "opacity-50 cursor-not-allowed" : ""
                }`}
  >
                  <div
                    className="flex items-center justify-center text-xs border border-gray-400 rounded-full w-4 h-4 cursor-pointer"
                    onClick={() => !firstBetPlaced && handleBetAmountChange("first", "subtract")}
                  >
                    <SubtractIcon />
                  </div>
                  <input
                    type="number"
                    value={firstBetAmount}
                    onChange={(e) => {
                      // Only allow changes if betPlacedBeforeStartFirst is false
                      if (!firstBetPlaced) {
                        const newAmount = e.target.value >= 10 ? e.target.value : 10;
                        setFirstBetAmount(newAmount);
                      }
                    }}
                    className="text-white text-center w-[calc(100%-32px)] p-0 focus:outline-none focus:ring-0"
                    disabled={firstBetPlaced} // Disable input when betPlacedBeforeStartFirst is true
                  />
                  <div
                    className="flex items-center justify-center text-xs border border-gray-400 rounded-full w-4 h-4 cursor-pointer"
                    onClick={() => !firstBetPlaced && handleBetAmountChange("first", "add")}
                  >
                    <PlusIcon />
                  </div>
                </Box>
                <Box className="grid grid-cols-2 gap-0.5 mt-0.5">
                  {betOptions.map((bet, index) => (
                    <div
                      key={index}
                      className="text-center text-[10px]  sm:text-xs py-0.5 bg-[#111013] text-gray-500 rounded-full cursor-pointer"
                      onClick={() => !firstBetPlaced && setFirstBetAmount(bet)}
                    >
                      {bet}.00
                    </div>
                  ))}
                </Box>
              </Box>

              <Box
                className={cn(" border border-white font-light text-lg rounded-2xl text-white px-5 flex-grow pb-1 text-center flex items-center justify-center cursor-pointer",
                  isPlaneCrashed && firstBetPlaced && betPlacedBeforeStartFirst
                    ? "bg-orange-500" : firstBetPlaced
                      ? "bg-red-500"
                      : "bg-[#29A90B]"
                )}
                onClick={handleClickFirst}
              >
                {isPlaneCrashed && firstBetPlaced && betPlacedBeforeStartFirst ? (
                  <>
                    CASHOUT <br /> ₹{(firstBetAmount * multiplier).toFixed(2)}
                  </>
                ) : firstBetPlaced ? (
                  <>CANCEL</>
                ) : (
                  <>
                    BET <br /> {firstBetAmount}.00 INR
                  </>
                )}
              </Box>
            </Box>
          </div>



          {/* /--------------------------------------------------------------/ */}


          {firstBetType === "Auto" && (
            <div className="text-gray-400 mt-1 flex items-center w-full justify-evenly gap-2 border-t-1 border-black">
              <AutoPlayButton
                newRoundStarted={isPlaneCrashed}
                handleBet={handleClickFirst}
                isBetPlaced={firstBetPlaced}
                setIsBetPlaced={setFirstBetPlaced}
                setBetPlacedBeforeStart={setBetPlacedBeforeStartFirst}
              />
              <AutoCashOut
                enabled={autoCashoutEnabledFirst}
                setEnabled={setAutoCashoutEnabledFirst}
                cashoutValue={autoCashOutFirst}
                setCashoutValue={setAutoCashOutFirst}
                isGameInProgress={isPlaneCrashed}
                isBetPlaced={firstBetPlaced}
              />
            </div>
          )}
        </Box>
        {/* Panel Two */}
        <Box className="bg-[#1f1f1f] rounded-xl">

          <div className="p-2">
            <Box className="bg-[black] flex w-8/12 mx-auto mb-3 rounded-full p-[1px]">
              <div
                className={cn('text-sm w-1/2  rounded-full cursor-pointer text-center transition-all font-light',
                  secondBetType === "Bet" ? "bg-[#3d3d3d] text-white" : "text-gray-400 hover:text-red-500"
                )}
                onClick={() => setSecondBetType("Bet")}
              >
                Bet
              </div>
              <div
                className={cn('text-sm w-1/2  rounded-full cursor-pointer text-center transition-all font-light',
                  secondBetType === "Auto" ? "bg-[#3d3d3d] text-white" : "text-gray-400 hover:text-red-500"
                )}
                onClick={() => setSecondBetType("Auto")}
              >
                Auto
              </div>
            </Box>


            {/* /--------------------------------------------------------------/ */}

            <Box className="flex gap-2 w-full">
              <Box className='w-[35%]'>

                <Box 
                  className={`flex gap-2 items-center bg-[#111013] px-2 py-0.5 rounded-full border ${
                    secondBetPlaced ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >

                  <div
                    className="flex items-center justify-center text-xs border border-gray-400 rounded-full w-4 h-4 cursor-pointer"
                    onClick={() => !secondBetPlaced && handleBetAmountChange("second", "subtract")}
                  >
                    <SubtractIcon />
                  </div>
                  <input
                    type="number"
                    value={secondBetAmount}
                    onChange={(e) => {
                      // Only allow changes if betPlacedBeforeStartSecond is false
                      if (!betPlacedBeforeStartSecond) {
                        const newAmount = e.target.value >= 10 ? e.target.value : 10;
                        setSecondBetAmount(newAmount);
                      }
                    }}
                    className="text-white text-center  w-[calc(100%-32px)] p-0 focus:outline-none focus:ring-0"
                    disabled={secondBetPlaced} // Disable input when betPlacedBeforeStartFirst is true
                    />
                  <div
                    className="flex items-center justify-center text-xs border border-gray-400 rounded-full w-4 h-4 cursor-pointer"
                    onClick={() => !secondBetPlaced && handleBetAmountChange("second", "add")}
                  >
                    <PlusIcon />
                  </div>
                </Box>

                <Box className="grid grid-cols-2 gap-0.5 mt-0.5">
                  {betOptions.map((bet, index) => (
                    <div
                      key={index}
                      className="text-center text-xs py-0.5 bg-[#111013] text-gray-500 rounded-full cursor-pointer"
                      onClick={() =>!secondBetPlaced && setSecondBetAmount(bet)}
                    >
                      {bet}.00
                    </div>
                  ))}
                </Box>
              </Box>

              <Box
                className={`border border-white font-light text-lg rounded-2xl text-white px-5 flex-grow pb-1 text-center flex items-center justify-center cursor-pointer ${isPlaneCrashed && secondBetPlaced && betPlacedBeforeStartSecond
                  ? "bg-orange-500"
                  : secondBetPlaced
                    ? "bg-red-500"
                    : "bg-[#29A90B]"
                  }`}
                onClick={handleClickSecond}
              >
                {isPlaneCrashed && secondBetPlaced && betPlacedBeforeStartSecond ? (
                  <>
                    CASHOUT <br /> ₹{(secondBetAmount * multiplier).toFixed(2)}
                  </>
                ) : secondBetPlaced ? (
                  <>CANCEL</>
                ) : (
                  <>
                    BET <br /> {secondBetAmount}.00 INR
                  </>
                )}
              </Box>
            </Box>
          </div>

          {secondBetType === "Auto" && (
            <div className="text-gray-400 mt-1 flex items-center w-full justify-evenly gap-2 border-t-1 border-black">
              <AutoPlayButton
                newRoundStarted={isPlaneCrashed}
                handleBet={handleClickSecond}
                isBetPlaced={secondBetPlaced}
                setIsBetPlaced={setSecondBetPlaced}
                setBetPlacedBeforeStart={setBetPlacedBeforeStartSecond}
              />
              <AutoCashOut
                enabled={autoCashoutEnabledSecond}
                setEnabled={setAutoCashoutEnabledSecond}
                cashoutValue={autoCashOutSecond}
                setCashoutValue={setAutoCashOutSecond}
                isGameInProgress={isPlaneCrashed}
                isBetPlaced={secondBetPlaced}
              />
            </div>
          )}
        </Box>
      </Box>

      {/* Current Game Bets */}
      <Box className="bg-[#1f1f1f] p-3 w-full">

        <Box className="bg-black flex mx-auto mb-3 p-[1px] rounded-full w-8/12 ">
          <Box
            className={cn('text-center rounded-full cursor-pointer font-light w-1/2 transition-all text-sm', historyType === "All Bets"
              ? "bg-[#3d3d3d] text-white"
              : "text-gray-400 hover:text-red-500")}
            onClick={() => setHistoryType("All Bets")}
          >
            All Bets
          </Box>
          <Box
            className={
              cn('text-center rounded-full cursor-pointer font-light w-1/2 transition-all text-sm', historyType === "My Bets"
                ? "bg-[#3d3d3d] text-white"
                : "text-gray-400 hover:text-red-500")}
            onClick={() => setHistoryType("My Bets")}
          >
            My Bets
          </Box>
        </Box>

        {historyType === "All Bets" ? (
          <div className="text-white font-semibold uppercase">
            {allBets.length} Bets
          </div>
        ) : (
          <div className="text-white font-semibold uppercase">
            {myBets.length} Bets
          </div>
        )}

      </Box>

      <BetsTable historyType={historyType} allBets={allBets} myBets={myBets} />
    </div>
  );
};

export default Aviatior;

