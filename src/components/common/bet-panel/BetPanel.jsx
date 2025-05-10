import { Drawer, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Add, Remove } from "@mui/icons-material";
import { cn } from "../../../utils/utils";


const balanceOptions = [1, 10, 100, 1000, 10000];
const quantityOptions = [1, 5, 10, 20, 50, 100];



const BetPanel = ({ heading, open, toggleDrawer, submitBet, betChoice, setSelectedQuantity, selectedQuantity }) => {
  const [selectedBalance, setSelectedBalance] = useState(1);
  // const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [amount, setAmount] = useState(1);


  useEffect(() => {
    setAmount(selectedBalance * selectedQuantity);
  }, [selectedBalance, selectedQuantity]);

  const handleCloseBetPanel = () => {
    setSelectedBalance(1);
    setSelectedQuantity(1);
  };

  const handlePlaceBet = () => {
    handleCloseBetPanel();
    submitBet(betChoice, amount);
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
      sx={{
        "& .MuiDrawer-paper": {
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
          maxHeight: "80vh",
        },
      }}
    >
      <Box className="text-white bg-[#374992] fixed bottom-0 left-1/2 -translate-x-1/2 rounded-t-2xl overflow-hidden w-full sm:w-[400px]">
        {/* Drawer Header */}
        <Box
          sx={{ clipPath: "polygon(100% 0, 100% 75%, 50% 100%, 0 75%, 0 0)" }}
          className={cn("h-fit p-5 pb-12",
            betChoice === 'RED' && "bg-[#D22F30]",
            betChoice === "GREEN" && "bg-[#2F7D31]",
            betChoice === "PURPLE" && "bg-[#8120A5]",
            betChoice === 'BIG' && "bg-[#FF8907]",
            betChoice === 'SMALL' && "bg-blue-400",
          )}
        >
          <Box className="text-center uppercase font-bold text-2xl">{heading}</Box>
          <Box className="text-center text-black font-light mt-3 py-1 rounded-lg bg-white">
            Select : {betChoice}
          </Box>
        </Box>
        {/* Betting Choice */}
        <Box className="bg-[#22275b] pb-5">
          {/* Balance */}
          <Box
            className="flex justify-between items-center sm:px-4 px-1 py-3 font-semibold">
            <Box className="text-xl">Balance</Box>
            <Box className="flex gap-2">
              {balanceOptions.map((option, index) => (
                <Box
                  key={index}
                  className={`p-2 ${index === 0 ? "sm:px-4 px-2 " : index === 1 ? "px-3" : ""
                    } rounded-lg cursor-pointer text-sm sm:text-base ${selectedBalance === option ? "bg-blue-400" : "bg-[#374992]"
                    }`}
                  onClick={() => setSelectedBalance(option)}
                >
                  {option}
                </Box>
              ))}
            </Box>
          </Box>
          {/* Quantity */}
          <Box className="flex justify-between items-center sm:px-4 px-2 py-3 font-semibold mb-3">
            <Box className="text-lg sm:text-xl">Quantity</Box>
            <Box className="flex gap-3 items-center">
              <Box
                className="p-1 rounded-lg cursor-pointer bg-blue-400"
                onClick={() =>
                  setSelectedQuantity((prev) => (prev > 0 ? prev - 1 : prev))
                }
              >
                <Remove />
              </Box>
              <input
                type="number"
                value={selectedQuantity}
                onChange={(e) =>
                  setSelectedQuantity((prev) =>
                    Number(e.target.value) >= 0 && Number(e.target.value) <= 100
                      ? Number(e.target.value)
                      : prev
                  )
                }
                className="w-24 border-[#626ab9] border text-center py-1 text-lg focus:outline-none focus:ring-0 focus:border-[#626ab9]"
              />
              <Box
                className="p-1 rounded-lg cursor-pointer bg-blue-400"
                onClick={() =>
                  setSelectedQuantity((prev) => (prev > 0 ? prev + 1 : prev))
                }
              >
                <Add />
              </Box>
            </Box>
          </Box>
          <Box className="flex gap-2 justify-end flex-wrap sm:flex-nowrap sm:px-4 px-2">
            <Button
              variant="contained"
              color="error"
              onClick={() =>
                setSelectedQuantity(
                  quantityOptions[
                  Math.floor(Math.random() * quantityOptions.length)
                  ]
                )
              }
            >
              Random
            </Button>

            {quantityOptions.map((option, index) => (
              <Box
                key={index}
                className={`p-2  rounded-lg text-sm cursor-pointer ${selectedQuantity === option ? "bg-blue-400" : "bg-[#374992]"
                  }`}
                onClick={() => setSelectedQuantity(option)}
              >
                X{option}
              </Box>
            ))}
          </Box>
        </Box>
        {/* Action Buttons */}
        <Box className="flex w-full text-xl font-semibold cursor-pointer text-center">
          <Box
            className="bg-[#374992] text-gray-300 flex-grow border-gray-400 border-r"
            onClick={handleCloseBetPanel}
          >
            <Box className="p-3" onClick={toggleDrawer(false)}>
              Cancel
            </Box>
          </Box>
          <Box
            className={cn("text-white flex-grow",
              betChoice === 'RED' && "bg-[#D22F30]",
              betChoice === "GREEN" && "bg-[#2F7D31]",
              betChoice === "PURPLE" && "bg-[#8120A5]",
              betChoice === 'BIG' && "bg-[#FF8907]",
              betChoice === 'SMALL' && "bg-blue-400",
            )}
            onClick={handlePlaceBet}
          >
            <Box className="p-3" onClick={toggleDrawer(false)}>
              Total amount ₹{amount}
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
};

export default BetPanel;
