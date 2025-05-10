import React from "react";
import sorryBackground from "../assets/sorry.png";
import BackdropScreen from "./BackdropScreen";
import successBackground from "../assets/win.png";
import close from "../assets/close.png";

const ResultModal = ({
  onClose = () => {},
  time = "30",
  type = "SUCCESS",
  lotteryResult = "",
}) => {
  const background = type === "SUCCESS" ? successBackground : sorryBackground;

  return (
    <>
      <div
        className="z-[1001] aspect-[593/812] w-3/4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[380px]"
        style={{
          backgroundImage: `url(${background})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          color: type === "SUCCESS" ? "white" : "#7190b4",
        }}
      >
        {/* Sorry */}
        <div className="mt-[42.5%] text-center text-[25px] font-bold ">
          {type === "SUCCESS" ? "Congratulations" : "Sorry"}
        </div>

        {/* Lottery results */}
        <div className="mt-[8%]  mx-auto w-[80%] flex">
          <span className="mr-[5%]">Lottery results</span>
          {lotteryResult}
        </div>

        {/* Lose */}
        <div
          className="mt-[20%] text-center text-[25px] font-bold "
          style={{ color: type === "SUCCESS" ? "#3c9cf6" : "" }}
        >
          {type === "SUCCESS" ? "Bonus" : "Lose"}
        </div>

        {/* Period */}
        <div className="mt-[2%] text-xs mx-auto w-[80%] text-[#ACAFC2] text-center">
          Period : {time} seconds
        </div>
        {/* Close */}
        <div
          onClick={onClose}
          className=" cursor-pointer flex aspect-square w-[40px] absolute top-full left-1/2 transform -translate-x-1/2 translate-y-full"
        >
          <img src={close} alt="close" />
        </div>
      </div>
      <BackdropScreen onClick={onClose} />
    </>
  );
};

export default ResultModal;
