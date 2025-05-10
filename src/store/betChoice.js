import { createSlice } from "@reduxjs/toolkit";

const betChoiceSlice = createSlice({
  name: "betChoice",
  initialState: "",
  reducers: {
    updateBetChoice: (state, action) =>
      (state = action.payload)
  },
});

export const betChoiceActions = betChoiceSlice.actions;
export default betChoiceSlice;
