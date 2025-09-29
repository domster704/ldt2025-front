import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {availableGoodColors, availableWarningColors} from "@shared/const/colors";
import {SettingsState} from "@entities/settings/model/types";

let initialState: SettingsState = {
  goodColor: availableGoodColors[0],
  warningColor: availableWarningColors[0]
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setChosenWarningColor(state, action: PayloadAction<string>) {
      state.warningColor = action.payload;
      localStorage.setItem("warningColor", action.payload);
    },
    setChosenGoodColor(state, action: PayloadAction<string>) {
      state.goodColor = action.payload;
      localStorage.setItem("goodColor", action.payload);
    },
    setInitialColors(state, action: PayloadAction<Partial<SettingsState>>) {
      if (action.payload.goodColor) state.goodColor = action.payload.goodColor;
      if (action.payload.warningColor) state.warningColor = action.payload.warningColor;
    }
  }
});

export const {
  setChosenWarningColor,
  setChosenGoodColor,
  setInitialColors
} = settingsSlice.actions;
export default settingsSlice.reducer;