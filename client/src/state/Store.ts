import { configureStore } from "@reduxjs/toolkit";
import menuSliceReducer from "./MenuSlice";
import expensesSliceReducer from "./ExpenseSlice";

import type { ExpensesState } from "./ExpenseSlice";
import categorySliceReducer, { categoryNameState } from "./CategorySlice";
import settingsSliceReducer, { SettingsState } from "./SettingsSlice";

export type RootState = {
  expenses: ExpensesState;
  menu: { isMenuMinimized: boolean };
  category: categoryNameState;
  settings: SettingsState;
};

export const store = configureStore({
  reducer: {
    menu: menuSliceReducer,
    expenses: expensesSliceReducer,
    category: categorySliceReducer,
    settings: settingsSliceReducer,
  },
});
