import { createSlice } from "@reduxjs/toolkit";

let token =
  localStorage.getItem("token") != null ? localStorage.getItem("token") : "";
let refreshToken =
  localStorage.getItem("refreshToken") != null
    ? localStorage.getItem("refreshToken")
    : "";

const initialState = {
  token: token,
  refreshToken: refreshToken,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
  },
});

export const { setToken, setRefreshToken } = tokenSlice.actions;
export default tokenSlice.reducer;
