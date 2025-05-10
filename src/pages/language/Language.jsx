import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBackIosNewRounded } from "@mui/icons-material";

const languages = [
  { name: "English", value: "en", emoji: "🇺🇸" },
  { name: "हिंदी", value: "hi", emoji: "🇮🇳" },
];

const Language = () => {
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState("en");

  return (
    <div className="bg-[#22275b] min-h-screen pb-6">
      {/* Header */}
      <div className="flex items-center px-4 py-4 bg-[#2b3270]">
        <button onClick={() => navigate(-1)}>
          <ArrowBackIosNewRounded className="text-white w-5 h-5" />
        </button>
        <div className="flex-1 text-center text-white font-medium">
          Language
        </div>
        <div className="w-5 h-5" />
      </div>

      {/* Language List */}
      <div className="flex flex-col gap-3 px-4 mt-4">
        {languages.map((lang) => (
          <div
            key={lang.value}
            onClick={() => setSelectedLang(lang.value)}
            className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all ${
              selectedLang === lang.value
                ? "bg-gradient-to-tr from-[#2aa8f3] to-[#297bf2]"
                : "bg-[#2b3270]"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{lang.emoji}</span>
              <span className="text-white font-medium">{lang.name}</span>
            </div>

            {/* Radio Circle */}
            <div className="w-5 h-5 flex items-center justify-center">
              {selectedLang === lang.value ? (
                <div className="w-4 h-4 rounded-full border-4 border-white bg-[#4f9ff9]" />
              ) : (
                <div className="w-4 h-4 rounded-full border-2 border-gray-400" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Language;
