import { configureStore } from "@reduxjs/toolkit";
import alertSlice, { alertActions } from "./alert";
import userDataSlice, { userDataActions } from "./userData";
import betChoiceSlice, { betChoiceActions } from "./betChoice";
import DiceReducer, {
  RESET_DICE_PLACED_BET,
  SET_DICE_BET_HISTORY,
  SET_DICE_GAME_HISTORY,
  SET_DICE_GAME_INFO,
  SET_DICE_PLACED_BET,
} from "./dice";

export const store = configureStore({
  reducer: {
    showAlert: alertSlice.reducer,
    userData: userDataSlice.reducer,
    betChoice: betChoiceSlice.reducer,
    dice: DiceReducer, 
  },
});

export { alertActions, userDataActions, betChoiceActions,
  RESET_DICE_PLACED_BET,
    SET_DICE_BET_HISTORY,
    SET_DICE_GAME_HISTORY,
    SET_DICE_GAME_INFO,
    SET_DICE_PLACED_BET,
};
