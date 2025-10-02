import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {availableGoodColors, availableWarningColors} from "@shared/const/colors";
import {SettingsState} from "@entities/settings/model/types";

/**
 * Начальное состояние настроек.
 *
 * - `goodColor` — цвет для состояния "норма" (берётся из {@link availableGoodColors}).
 * - `warningColor` — цвет для состояния "предупреждение/ухудшение"
 *   (берётся из {@link availableWarningColors}).
 */
let initialState: SettingsState = {
  goodColor: availableGoodColors[0],
  warningColor: availableWarningColors[0]
};

/**
 * Slice Redux-хранилища для управления настройками приложения.
 *
 * ### Состояние:
 * - `goodColor: string` — текущий выбранный цвет для нормального состояния.
 * - `warningColor: string` — текущий выбранный цвет для предупреждающего состояния.
 *
 * ### Reducers:
 * - `setChosenWarningColor(color: string)`
 *   Устанавливает новый предупреждающий цвет и сохраняет его в `localStorage`.
 *
 * - `setChosenGoodColor(color: string)`
 *   Устанавливает новый цвет для нормального состояния и сохраняет его в `localStorage`.
 *
 * - `setInitialColors(partial: Partial<SettingsState>)`
 *   Устанавливает начальные цвета из переданных данных (например, из `localStorage`).
 *
 * ### LocalStorage:
 * - `goodColor` — сохраняется при вызове `setChosenGoodColor`.
 * - `warningColor` — сохраняется при вызове `setChosenWarningColor`.
 *
 * @example
 * ```tsx
 * const dispatch = useAppDispatch();
 *
 * // Сменить цвет "нормы"
 * dispatch(setChosenGoodColor("#00a619"));
 *
 * // Сменить цвет "предупреждения"
 * dispatch(setChosenWarningColor("#ff0000"));
 *
 * // Восстановить из localStorage
 * dispatch(setInitialColors({
 *   goodColor: localStorage.getItem("goodColor") ?? undefined,
 *   warningColor: localStorage.getItem("warningColor") ?? undefined,
 * }));
 * ```
 */
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
