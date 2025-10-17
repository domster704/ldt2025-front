import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {APP_URL, STATUS_PAGE_URL} from "@shared/const/constants";

/**
 * Начальное состояние глобального среза приложения.
 *
 * - `currentPage` — текущая активная страница (по умолчанию `/status`).
 */
let initialState = {
  currentPage: STATUS_PAGE_URL,
};

/**
 * Slice глобального состояния приложения.
 *
 * ### Назначение:
 * Управляет данными верхнего уровня, которые не относятся к отдельным сущностям,
 * но нужны для работы навигации и UI.
 *
 * ### Состояние:
 * - `currentPage: APP_URL` — текущий путь (страница), выбранная пользователем.
 *
 * ### Reducers:
 * - `setCurrentPage(state, action: PayloadAction<APP_URL>)`
 *   Устанавливает текущую страницу приложения.
 *   Обычно диспатчится из layout-компонентов (например, {@link RootLayout}),
 *   чтобы при каждом изменении маршрута обновлять Redux.
 *
 */
const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<APP_URL>) => {
      state.currentPage = action.payload;
    }
  }
});

export const {setCurrentPage} = globalSlice.actions;
export default globalSlice.reducer;
