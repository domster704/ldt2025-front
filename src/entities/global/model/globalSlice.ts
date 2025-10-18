import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {APP_URL, STATUS_PAGE_URL} from "@shared/const/constants";
import {ClassificationType, GlobalState} from "@entities/global/model/types";

/**
 * Начальное состояние глобального среза приложения.
 *
 * - `currentPage` — текущая активная страница (по умолчанию `/status`).
 */
let initialState: GlobalState = {
  currentPage: STATUS_PAGE_URL,
  isWidgetLayoutEdit: false,
  classification: ClassificationType.FIGO
};

/**
 * Slice глобального состояния приложения.
 *
 */
const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<APP_URL>) => {
      state.currentPage = action.payload;
    },
    setWidgetLayoutEdit: (state, action: PayloadAction<boolean>) => {
      state.isWidgetLayoutEdit = action.payload;
    },
    setClassification: (state, action: PayloadAction<ClassificationType>) => {
      state.classification = action.payload;
    }
  }
});

export const {
  setCurrentPage,
  setWidgetLayoutEdit,
  setClassification
} = globalSlice.actions;
export default globalSlice.reducer;
