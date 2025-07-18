import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Expense } from "@/types/Expense";
import { categoryName } from "@/types/CategoryName";

export type ExpensesState = {
  items: Expense[];
  categories: categoryName[];
};

const initialState = {
  items: [],
  categories: [],
} as ExpensesState;

export const ExpenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpenses: (state, action: PayloadAction<Expense[]>) => {
      state.items = action.payload;
    },
    addCategories: (state, action: PayloadAction<categoryName[]>) => {
      state.categories = action.payload;
    },
  },
});

export const { addExpenses, addCategories } = ExpenseSlice.actions;
export default ExpenseSlice.reducer;
