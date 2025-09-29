import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {APP_URL, HOME_PAGE_URL} from "@shared/const/constants";

let initialState = {
  currentPage: HOME_PAGE_URL,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<APP_URL>) => {
      state.currentPage = action.payload;
    }
  }
});

export const {
  setCurrentPage,
} = globalSlice.actions;
export default globalSlice.reducer;