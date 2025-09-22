import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {APP_URL, HOME_PAGE_URL} from "@shared/const/constants";

let initialState = {
  currentPage: HOME_PAGE_URL,
  trialPeriodExpired: false
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<APP_URL>) => {
      state.currentPage = action.payload;
    },
    setTrialPeriodExpired: (state, action: PayloadAction<boolean>) => {
      state.trialPeriodExpired = action.payload;
    }
  }
});

export const {
  setTrialPeriodExpired,
  setCurrentPage,
} = globalSlice.actions;
export default globalSlice.reducer;