import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import giftBanner from "../assets/gift-banner.png"; // Replace with your actual path
import giftEmptyIcon from "../assets/empty-folder.png"; // Replace with your actual path

const GiftPage = () => {
  const navigate = useNavigate();
  const [giftCode, setGiftCode] = useState("");

  const handleReceive = () => {
    if (!giftCode.trim()) return;
    console.log("Gift Code:", giftCode);
    setGiftCode("");
  };

  return (
    <div className="bg-[#22275b] min-h-screen pb-4">
      {/* Header */}
      <div className="transaction-header">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft className="text-white w-5 h-5" />
        </button>
        <div className="flex-1 text-center text-white text-b font-medium">
          Gift
        </div>
        <div className="w-5 h-5" />
      </div>

      {/* Banner */}
      <div className="w-full">
        <img
          src={giftBanner}
          alt="Gift Banner"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Gift Code Entry */}
      <div className="bg-[#2b3270] rounded-[10px] mx-[15px] mt-4 p-4">
        <p className="text-white text-sm mb-1">Hi</p>
        <p className="text-white text-sm mb-4">We have a gift for you</p>

        <label className="text-sm text-white mb-2 block">
          Please enter the gift code below
        </label>
        <input
          type="text"
          placeholder="Please enter gift code"
          value={giftCode}
          onChange={(e) => setGiftCode(e.target.value)}
          className="w-full bg-[#1c204b] text-white text-sm px-4 py-2 rounded-md placeholder:text-gray-400 outline-none mb-4"
        />

        <button
          onClick={handleReceive}
          className="w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white text-sm py-2 rounded-[20px] font-medium"
        >
          Receive
        </button>
      </div>

      {/* History Section */}
      <div className="bg-[#2b3270] rounded-[10px] mx-[15px] mt-4 p-4 text-white text-sm">
        <div className="mb-4 font-medium flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-400 rounded-full" />
          History
        </div>
        <div className="flex flex-col items-center justify-center py-6">
          <img
            src={giftEmptyIcon}
            alt="Empty history"
            className="w-[180px] h-[180px] object-contain opacity-30"
          />
          <p className="mt-2 text-gray-400 text-sm">No data</p>
        </div>
      </div>
    </div>
  );
};

export default GiftPage;
