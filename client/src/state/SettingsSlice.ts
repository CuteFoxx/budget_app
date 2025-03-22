import { Currency } from "@/types/Currency";
import { UserSettings } from "@/types/UserSettings";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SettingsState = {
  items: UserSettings;
  currencies: Currency[];
};

const initialState = {
  items: {},
} as SettingsState;

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<UserSettings>) => {
      state.items = action.payload;
    },
    setCurrencies: (state, action: PayloadAction<Currency[]>) => {
      state.currencies = action.payload;
    },
  },
});

export const { setSettings, setCurrencies } = settingsSlice.actions;
export default settingsSlice.reducer;
