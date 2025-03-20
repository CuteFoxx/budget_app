import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { categoryName } from "@/types/CategoryName";

export type categoryNameState = {
  items: categoryName[];
};

const initialState = {
  items: [],
} as categoryNameState;

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategories: (state, action: PayloadAction<categoryName[]>) => {
      return { ...state.items, items: action.payload };
    },
  },
});

export const { addCategories } = categorySlice.actions;
export default categorySlice.reducer;
