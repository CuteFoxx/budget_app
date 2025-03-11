import { createSlice } from "@reduxjs/toolkit";

let token =
  localStorage.getItem("token") != null ? localStorage.getItem("token") : "";

const initialState = {
  token: token,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;
