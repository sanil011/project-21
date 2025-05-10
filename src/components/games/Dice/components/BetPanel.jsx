import { Drawer, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Add, Remove } from "@mui/icons-material";
import { cn } from "../../../../utils/utils";

const balanceOptions = [1, 10, 100, 1000, 10000];
const quantityOptions = [1, 5, 10, 20, 50, 100];


const BetPanel = ({
  heading,
  open,
  toggleDrawer,
  submitBet,
  betChoice
}) => {
  const [selectedBalance, setSelectedBalance] = useState(1);
  const [amount, setAmount] = useState(1);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    console.log("sanil", selectedBalance , selectedQuantity)
    setAmount(selectedBalance * selectedQuantity);
  }, [selectedBalance, selectedQuantity]);

  const handleCloseBetPanel = () => {
    setSelectedBalance(1);
    setSelectedQuantity(1);
    toggleDrawer(false)(); // Close drawer properly
  };

  const handlePlaceBet = () => {
    submitBet(betChoice, amount);
    handleCloseBetPanel();
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        "& .MuiDrawer-paper": {
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
          maxHeight: "80vh",
        },
      }}
    >
      <Box className="bg-[#342e3d] text-[#fbdf9a] fixed bottom-0 left-1/2 -translate-x-1/2 rounded-t-2xl overflow-hidden w-full max-w-[400px] sm:w-full">
        {/* Header */}
        <Box
          sx={{ clipPath: "polygon(100% 0, 100% 75%, 50% 100%, 0 75%, 0 0)" }}
          className={cn(
            "h-fit p-5 pb-12 text-center uppercase font-bold text-2xl",
            betChoice === "RED" && "bg-[#D22F30]",
            betChoice === "GREEN" && "bg-[#2F7D31]",
            betChoice === "PURPLE" && "bg-[#8120A5]",
            betChoice === "BIG" && "bg-[#FF8907]",
            betChoice === "SMALL" && "bg-blue-400"
          )}
        >
          {heading}
          <Box className="text-center text-black font-light mt-3 py-1 rounded-lg bg-white text-sm sm:text-base">
            Select : {betChoice}
          </Box>
        </Box>

        {/* Content */}
        <Box className="bg-[#241d2a] pb-5 px-2 sm:px-4">
          {/* Balance */}
          <Box className="flex justify-between items-center py-3 font-semibold flex-wrap">
            <Box className="text-lg sm:text-xl">Balance</Box>
            <Box className="flex gap-2 flex-wrap justify-end">
              {balanceOptions.map((option, index) => (
                <Box
                  key={index}
                  className={`px-3 py-1 rounded-lg cursor-pointer text-sm sm:text-base ${selectedBalance === option
                      ? "bg-[#8c6a36] text-[#fbdf9a]"
                      : "bg-[#342e3d]"
                    }`}
                  onClick={() => setSelectedBalance(option)}
                >
                  {option}
                </Box>
              ))}
            </Box>
          </Box>

          {/* Quantity */}
          <Box className="flex justify-between items-center py-3 font-semibold mb-3 flex-wrap">
            <Box className="text-lg sm:text-xl">Quantity</Box>
            <Box className="flex gap-3 items-center">
              <Box
                className="p-1 rounded-lg cursor-pointer bg-[#8c6a36] text-[#fbdf9a]"
                onClick={() =>
                  setSelectedBalance((prev) => (prev > 0 ? prev - 1 : prev))
                }
              >
                <Remove fontSize="small" />
              </Box>
              <input
                type="number"
                value={amount}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  console.log("sanil value", value);
                  setAmount(value);

                }}
                className="w-20 sm:w-24 border-[#8c6a36] border text-center py-1 text-lg bg-[#342e3d] text-[#fbdf9a] focus:outline-none focus:ring-0 focus:border-[#8c6a36]"
              />
              <Box
                className="p-1 rounded-lg cursor-pointer bg-[#8c6a36] text-[#fbdf9a]"
                onClick={() => setSelectedBalance((prev) => prev + 1)}
              >
                <Add fontSize="small" />
              </Box>
            </Box>
          </Box>

          {/* Random + Quick Quantity */}
          <Box className="flex gap-1 justify-start flex-wrap mt-4">
            <Box
              onClick={() =>
                setSelectedQuantity(
                  quantityOptions[Math.floor(Math.random() * quantityOptions.length)]
                )
              }
              className="flex items-center justify-center px-2 h-8 rounded-md bg-[#8c6a36] text-[#fbdf9a] text-sm font-semibold cursor-pointer"
            >
              RANDOM
            </Box>
            {quantityOptions.map((option, index) => (
              <Box
                key={index}
                onClick={() => setSelectedQuantity(option)}
                className={cn(
                  "flex items-center justify-center w-10 h-8 rounded-md cursor-pointer text-sm font-semibold",
                  selectedQuantity === option
                    ? "bg-[#8c6a36] text-[#fbdf9a]"
                    : "bg-[#342e3d] text-[#fbdf9a]"
                )}
              >
                X{option}
              </Box>
            ))}
          </Box>

        </Box>

        {/* Footer Buttons */}
        <Box className="flex w-full text-lg sm:text-xl font-semibold cursor-pointer text-center">
          <Box
            className="bg-[#342e3d] text-[#fbdf9a] flex-1 border-gray-600 border-r"
            onClick={handleCloseBetPanel}
          >
            <Box className="p-3">Cancel</Box>
          </Box>
          <Box
            className={cn(
              "flex-1 text-[#fbdf9a]",
              betChoice === "RED" && "bg-[#D22F30]",
              betChoice === "GREEN" && "bg-[#2F7D31]",
              betChoice === "PURPLE" && "bg-[#8120A5]",
              betChoice === "BIG" && "bg-[#FF8907]",
              betChoice === "SMALL" && "bg-blue-400"
            )}
            onClick={handlePlaceBet}
          >
            <Box className="p-3">
              Total ₹{amount}
            </Box>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

BetPanel.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  submitBet: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
  betChoice: PropTypes.string.isRequired,
  setSelectedQuantity: PropTypes.func.isRequired,
  selectedQuantity: PropTypes.number.isRequired,
};

export default BetPanel;
