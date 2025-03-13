import { createSlice, PayloadAction } from "@reduxjs/toolkit";

let isMenuMinimized: boolean = true;

if (localStorage.getItem("isMenuMinimized") != null) {
  isMenuMinimized = JSON.parse(
    localStorage.getItem("isMenuMinimized") ?? "true"
  );
}

const initialState = {
  isMenuMinimized: isMenuMinimized,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setIsMenuMinimized: (state, action: PayloadAction<boolean>) => {
      state.isMenuMinimized = action.payload;
    },
  },
});

export const { setIsMenuMinimized } = menuSlice.actions;
export default menuSlice.reducer;
