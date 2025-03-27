import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Income } from "@/types/Income";
import { categoryName } from "@/types/CategoryName";

export type IncomesState = {
  items: Income[];
  categories: categoryName[];
};

const initialState = {
  items: [],
  categories: [],
} as IncomesState;

export const IncomeSlice = createSlice({
  name: "incomes",
  initialState,
  reducers: {
    addIncomes: (state, action: PayloadAction<Income[]>) => {
      state.items = action.payload;
    },
    addCategories: (state, action: PayloadAction<categoryName[]>) => {
      state.categories = action.payload;
    },
  },
});

export const { addIncomes, addCategories } = IncomeSlice.actions;
export default IncomeSlice.reducer;
