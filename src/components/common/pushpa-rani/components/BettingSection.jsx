import { useState } from 'react'
import Modal from './Modal';
import UpIcon from "../icon/up";
import DownIcon from "../icon/down"
import { cn } from '../../../../utils/utils';
import { useDispatch, useSelector } from "react-redux";
import { userDataActions } from '../../../../store';
import api from "../../../../services/api";


const BettingSection = ({ lerp, isPlaneCrashed, setWinMessage, setErrorMessage, buttonId }) => {
  const { userName, balance } = useSelector(store => store.userData)

  const dispatch = useDispatch();
  // for bet button functions
  const [isBetting, setIsBetting] = useState(false);
  const [betPlacedBeforeStart, setBetPlacedBeforeStart] = useState(false);
  const [amount, setAmount] = useState(10);

  const [activeTab, setActiveTab] = useState('bet');
  const [autoCashOut, setAutoCashOut] = useState(false);
  const [autoMultiplier, setAutoMultiplier] = useState(1.1);

  const presetAmounts = [10, 100, 500, 1000];

  const adjustAmount = (increment) => {
    if (!isBetting) {
      setAmount(prev => Math.max(0, prev + increment));
    } ``
  };

  const handleBetClick = async () => {

    if (!isBetting) {
      // 🟢 Placing Bet
      setIsBetting(true);

      try {
        const gameId = localStorage.getItem("gameId");
        const response = await api.post("/api/v1/virtual-games/submitAviatorBet?gameName=pushpa", {
          amount: amount,
          gameId,
          userName: userName,
          buttonId: "button" + buttonId,
          autoCashoutMultiplier: null
        })

        const data = response.data;
        console.log("Bet API Response:", data);
        const newBalance = balance - amount
        dispatch(userDataActions.updateBalance(newBalance));
        if (!data || data.success === false || data.error) {
          setErrorMessage(data?.message || "Wait For Next Round!");
          setIsBetting(false);
          setTimeout(() => setErrorMessage(null), 3000);
          return;
        }

        // ✅ If API was successful, update game state
        if (!isPlaneCrashed) {
          setBetPlacedBeforeStart(true);
        }
      } catch (error) {
        console.log("Network Error:", error);
        setErrorMessage("Stage Timeout");
        setIsBetting(false);
        setTimeout(() => setErrorMessage(null), 3000);
      }
    }

    // 🛑 If Bet is Placed but Game is Not Running -> Cancel the Bet
    else if (betPlacedBeforeStart && !isPlaneCrashed) {
      // else if (!isPlaneCrashed) {
      try {
        const gameId = localStorage.getItem("gameId");
        const response = await api.post("/api/v1/virtual-games/cancelBet?gameName=pushpa", {
          amount,
          gameId,
          userName: userName,
          buttonId: "button" + buttonId
        })

        const newBalance = balance + amount;
        dispatch(userDataActions.updateBalance(newBalance));
        const data = response.data;
        console.log("Cancel API Response:", data);

        if (!data || data.success === false || data.error) {
          setErrorMessage(data?.message || "Stage Timeout");
          setTimeout(() => setErrorMessage(null), 3000);
          return;
        }

        // ✅ Successfully canceled bet - Reset state
        setIsBetting((prev) => !prev);
        setBetPlacedBeforeStart(false);
      } catch (error) {
        console.log("Network Error:", error);
        setErrorMessage("Stage Timeout");
        setTimeout(() => setErrorMessage(null), 3000);
      }
    }

    // 🟠 If Game is Running -> Process Cashout
    else {
      try {
        const response = await api.post("/api/v1/virtual-games/encashAviatorBet?gameName=pushpa", {
          firstBetAmount: amount,
          userName: userName,
          buttonId: "button" + buttonId
        })


        const data = response.data;
        console.log("Cashout API Response:", data);
        const newBalance = balance - data.encashedAmount
        dispatch(userDataActions.updateBalance(newBalance));

        if (!data || data.success === false || data.error) {
          setErrorMessage(data?.message || "Stage Timeout");
          setTimeout(() => setErrorMessage(null), 3000);
          return;
        }

        // ✅ Show "WON" if `isEncashed` is true
        if (data.ifEncashed === true) {
          setWinMessage(`You Won: ₹${data.encashedAmount}`);
          setTimeout(() => setWinMessage(null), 3000);
        }

        // ✅ Successful Cashout - Reset bet states
        setIsBetting((prev) => !prev);
        setAmount(presetAmounts[0]);
        setBetPlacedBeforeStart(false);
      } catch (error) {
        console.log("Network Error:", error);
        setErrorMessage("Stage Timeout");
        setTimeout(() => setErrorMessage(null), 3000);
      }
    }



  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  return (
    <div className={`betting-section  ${isBetting ? 'betting-active' : ''}`}>

      <div className="main-controls">
        {isBetting && (
          <div className="waiting-text">WAITING FOR NEXT ROUND</div>
        )}

        <div className="amount-control">

          <div className="relative flex justify-center w-[95%]  mx-auto">
            <button
              onClick={() => adjustAmount(-10)}
              className="cursor-pointer absolute -top-0.5 -left-2 shadow-[0_0_0_2px_#6220B2] border-[2.5px] border-black w-10 h-10 rounded-full flex justify-center items-center bg-yellow-400"
              disabled={isBetting}
            >
              <DownIcon />

            </button>
            <input
              type="number"
              value={amount}
              onChange={(e) => !isBetting && setAmount(Number(e.target.value))}
              className="w-[96%] mx-auto bg-blue-400 shadow-[0_0_0_2px_#6220B2] text-black font-semibold text-center h-[2.3rem]  p-0 focus:outline-none border-2 border-black"
              disabled={isBetting}
            />
            <button
              onClick={() => adjustAmount(10)}
              className=" absolute -top-0.5 -right-2 cursor-pointer shadow-[0_0_0_2px_#6220B2] border-[2.5px] border-black w-10 h-10 rounded-full flex justify-center items-center bg-yellow-400"
              disabled={isBetting}
            >
              <UpIcon />

            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 ">

            <button
              onClick={() => !isBetting && setAmount(10)}
              className='bg-[#6A46F3] w-full h-full text-white text-lg font-bold py-1.5 px-4 shadow-[0_0_0_2px_#FDC800] border-2 border-black rounded-xl transform transition-all duration-200 hover:bg-purple-700 cursor-pointer'
              disabled={isBetting}
            >10</button>
            <button
              onClick={() => !isBetting && setAmount(100)}
              className='bg-[#6A46F3] w-full h-full text-white text-lg font-bold py-1.5 px-4 shadow-[0_0_0_2px_#FDC800] border-2 border-black rounded-xl transform transition-all duration-200 hover:bg-purple-700 cursor-pointer'
              disabled={isBetting}
            >100</button>


            <button
              onClick={() => !isBetting && setAmount(500)}
              className='bg-[#6A46F3] w-full h-full text-white text-lg font-bold py-1.5 px-4 shadow-[0_0_0_2px_#FDC800] border-2 border-black rounded-xl transform transition-all duration-200 hover:bg-purple-700 cursor-pointer'
              disabled={isBetting}
            >500</button>
            <button
              onClick={() => !isBetting && setAmount(1000)}
              className='bg-[#6A46F3] w-full h-full text-white text-lg font-bold py-1.5 px-4 shadow-[0_0_0_2px_#FDC800] border-2 border-black rounded-xl transform transition-all duration-200 hover:bg-purple-700 cursor-pointer'
              disabled={isBetting}
            >1000</button>

          </div>
        </div>

        <div className='flex flex-col gap-2 h-full'>
          <button
            className={cn("bg-[#6A46F3] h-[90px] text-white text-lg font-bold py-2 px-4 shadow-[0_0_0_2px_#FDC800] border-2 border-black rounded-xl transform transition-all duration-200 hover:bg-purple-700 cursor-pointer",
              isPlaneCrashed && isBetting && betPlacedBeforeStart
                ? "bg-[#3adf11]"
                : isBetting
                  ? "bg-red-500"
                  : "bg-[#6A46F3]"
            )}
            onClick={handleBetClick}
          >
            {isPlaneCrashed && isBetting & betPlacedBeforeStart ? (
              <>
                CASHOUT <br /> ₹{(amount * lerp).toFixed(2)}
              </>
            ) : isBetting ? (
              <>CANCEL</>
            ) : (
              <>
                BET <br /> {amount}.00
              </>
            )}

          </button>

          <button
            disabled={true}
            onClick={openModal}
            className={"bg-[#6A46F3] opacity-40 text-white text-lg font-bold py-2 px-4 shadow-[0_0_0_2px_#FDC800] border-2 border-black rounded-xl transform transition-all duration-200 hover:bg-purple-700 cursor-pointer"}>
            Auto
          </button>
          <Modal isOpen={isModalOpen} onClose={closeModal} />
        </div>

      </div>
    </div>
  );
};

export default BettingSection