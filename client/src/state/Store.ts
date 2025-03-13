import { configureStore } from "@reduxjs/toolkit";
import tokenSliceReducer from "./TokenSlice";
import menuSliceReducer from "./MenuSlice";

export const store = configureStore({
  reducer: {
    token: tokenSliceReducer,
    menu: menuSliceReducer,
  },
});
