import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    isAuthenticated: false,
    isCheckingAuth: true,
    balance: 0, // Optional, but good to have
  },
  reducers: {
    updateUser: (state, action) =>
      action.payload
        ? {
          ...action.payload,
          isAuthenticated: true,
          isCheckingAuth: false,
        }
        : { isAuthenticated: false, isCheckingAuth: false },

    // 👇 Add this reducer to support balance update
    updateBalance: (state, action) => {
      state.balance = action.payload;
    },
  },
});

export const userDataActions = userDataSlice.actions;
export default userDataSlice;
