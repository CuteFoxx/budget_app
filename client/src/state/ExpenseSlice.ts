import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Expense } from "@/types/Expense";

export type ExpensesState = {
  items: Expense[];
};

const initialState = {
  items: [],
} as ExpensesState;

export const menuSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpenses: (state, action: PayloadAction<Expense[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addExpenses } = menuSlice.actions;
export default menuSlice.reducer;
