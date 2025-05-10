import { useEffect } from "react";

const ConfirmPopup = ({ onClick }) => {
  useEffect(() => {
    // Disable body scroll when the popup is open
    document.body.style.overflow = "hidden";

    // Re-enable scroll when the popup is removed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      onClick={onClick}
      style={{ backgroundColor: "rgba(0,0,0,0.4)", zIndex: 999 }}
      className="w-full h-full fixed top-0 left-0 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-11/12 max-w-[370px] h-[60vh] flex flex-col items-center justify-between py-2 bg-[#2B3370] text-white rounded-lg mx-auto"
      >
        <h1 className="text-lg font-bold text-center mb-2">Welcome To Play-247 !</h1>

        <div className="h-[90%] w-full overflow-auto py-4">
          <div className="flex flex-col items-center space-y-2 mb-2">
            <h1 className="bg-[#FFFD00] inline-block text-black font-bold">FOLLOW OUR LATEST </h1>
            <h1 className="bg-[#FFFD00] inline-block text-black font-bold">INFORMATION AND NEWS IN</h1>
            <div className="bg-[#FFFD00] px-4 py-1 text-black font-extrabold text-center">👆 👆</div>
            <div className="bg-[#FFFD00] px-8 text-blue-800 font-extrabold text-center text-base">Play-247</div>
            <div className="bg-[#FFFD00] px-8 text-blue-800 font-extrabold text-center text-base">
              OFFICIAL TELEGRAM
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2 w-full">
            {[
              "📢 Important Announcement:",
              "Beware of Imitations!",
              "Dear Valued Members,",
              "We have noticed an increase in",
              "imitation of our PLATFORM,",
              "Play-247. To ensure you are on",
              "the legitimate ,",
              "please verify authenticity",
              "through our official channels.",
              "Stay vigilant and report",
              "any suspicious activity. Thank you",
              "for your continued trust and support.",
            ].map((line, idx) => (
              <div
                key={idx}
                className="bg-white inline-block text-gray-700 font-bold text-base text-center"
              >
                {line}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onClick}
          className="bg-blue-500 text-center mt-2 hover:bg-blue-600 text-white font-bold py-1 rounded-full text-lg w-2/5 transition-colors duration-300"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmPopup;
