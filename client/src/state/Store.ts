import { configureStore } from "@reduxjs/toolkit";
import menuSliceReducer from "./MenuSlice";

export const store = configureStore({
  reducer: {
    menu: menuSliceReducer,
  },
});
