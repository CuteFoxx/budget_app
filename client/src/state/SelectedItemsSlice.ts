import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Expense } from "@/types/Expense";
import { Income } from "@/types/Income";

export type SelectedItemsState = {
  expenses: Expense[];
  incomes: Income[];
};

const initialState = {
  expenses: [],
  incomes: [],
} as SelectedItemsState;

export const SelectedItemsSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    addSelectedExpenses: (state, action: PayloadAction<Expense[]>) => {
      state.expenses = action.payload;
    },
    addSelectedIncomes: (state, action: PayloadAction<Income[]>) => {
      state.incomes = action.payload;
    },
  },
});

export const { addSelectedExpenses, addSelectedIncomes } =
  SelectedItemsSlice.actions;

export default SelectedItemsSlice.reducer;
