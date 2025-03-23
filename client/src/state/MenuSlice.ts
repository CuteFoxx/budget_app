import { createSlice, PayloadAction } from "@reduxjs/toolkit";

let isMenuMinimized: boolean = true;

if (localStorage.getItem("isMenuMinimized") != null) {
  isMenuMinimized = JSON.parse(
    localStorage.getItem("isMenuMinimized") ?? "true"
  );
}

const initialState = {
  isMenuMinimized: isMenuMinimized,
  isMenuOpen: false,
  isTablet: true,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setIsMenuMinimized: (state, action: PayloadAction<boolean>) => {
      state.isMenuMinimized = action.payload;
    },
    setIsMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMenuOpen = action.payload;
    },
    setIsTablet: (state, action: PayloadAction<boolean>) => {
      state.isTablet = action.payload;
    },
  },
});

export const { setIsMenuMinimized, setIsMenuOpen, setIsTablet } =
  menuSlice.actions;
export default menuSlice.reducer;
