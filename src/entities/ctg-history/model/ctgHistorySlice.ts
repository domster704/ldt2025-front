import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AnalysisResult, CTGHistoryDTO, CTGHistoryState} from "@entities/ctg-history/model/types";
import {ctgHistoryAdapter} from "@entities/ctg-history/model/adapters";
import {fetchAllCTGHistory, fetchAllCTGHistoryAnalysis} from "@entities/ctg-history/api/ctgHistoryThunk";

/**
 * Начальное состояние slice истории КТГ.
 *
 * Используется {@link ctgHistoryAdapter}, чтобы:
 * - сгенерировать пустое состояние `getInitialState()`;
 */
const initialState: CTGHistoryState = {
  items: ctgHistoryAdapter.getInitialState(),
  analysis: null
};

/**
 * Redux Slice для управления историей КТГ (Cardiotocography History).
 *
 * ### Основные задачи:
 * - Хранение данных о предыдущих исследованиях КТГ.
 * - Обновление данных после загрузки с сервера.
 * - Использование адаптера {@link ctgHistoryAdapter} для удобной нормализации состояния.
 *
 * ### Reducers:
 * - отсутствуют (прямые изменения не предусмотрены, только через `extraReducers`).
 *
 * ### ExtraReducers:
 * - {@link fetchAllCTGHistory.fulfilled}
 *   При успешной загрузке истории заменяет все текущие данные новыми.
 *   Если `data` === `null`, состояние не изменяется.
 *
 * ### Состояние:
 * - `items`: EntityState<CTGHistoryDTO> — нормализованное состояние (ids + entities).
 *
 * @see fetchAllCTGHistory
 * @see ctgHistoryAdapter
 */
const ctgHistorySlice = createSlice({
  name: 'ctgHistory',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllCTGHistory.fulfilled, (state, action: PayloadAction<CTGHistoryDTO[]>) => {
        ctgHistoryAdapter.setAll(state.items, action.payload);
      })
      .addCase(fetchAllCTGHistoryAnalysis.fulfilled, (state, action: PayloadAction<AnalysisResult>) => {
        state.analysis = action.payload.analysis;
      })
      .addCase(fetchAllCTGHistoryAnalysis.rejected, (state) => {
        state.analysis = null;
      });
  },
});

export default ctgHistorySlice.reducer;
