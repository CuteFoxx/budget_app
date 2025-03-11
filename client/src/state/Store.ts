import { configureStore } from "@reduxjs/toolkit";
import tokenSliceReducer from "./TokenSlice";

export const store = configureStore({
  reducer: {
    token: tokenSliceReducer,
  },
});
