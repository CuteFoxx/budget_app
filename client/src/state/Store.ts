import { configureStore } from "@reduxjs/toolkit";
import menuSliceReducer from "./MenuSlice";
import expensesSliceReducer from "./ExpenseSlice";

import type { ExpensesState } from "./ExpenseSlice";
import categorySliceReducer, { categoryNameState } from "./CategorySlice";

export type RootState = {
  expenses: ExpensesState;
  menu: { isMenuMinimized: boolean };
  category: categoryNameState;
};

export const store = configureStore({
  reducer: {
    menu: menuSliceReducer,
    expenses: expensesSliceReducer,
    category: categorySliceReducer,
  },
});
