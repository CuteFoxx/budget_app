import { configureStore } from "@reduxjs/toolkit";
import menuSliceReducer from "./MenuSlice";
import expensesSliceReducer from "./ExpenseSlice";

import type { ExpensesState } from "./ExpenseSlice";
import settingsSliceReducer, { SettingsState } from "./SettingsSlice";
import incomesSliceReducer, { IncomesState } from "./IncomeSlice";

export type RootState = {
  expenses: ExpensesState;
  incomes: IncomesState;
  menu: { isMenuMinimized: boolean; isMenuOpen: boolean; isTablet: boolean };
  settings: SettingsState;
};

export const store = configureStore({
  reducer: {
    menu: menuSliceReducer,
    expenses: expensesSliceReducer,
    incomes: incomesSliceReducer,
    settings: settingsSliceReducer,
  },
});
