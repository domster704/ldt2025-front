import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AnalysisResult, CTGHistoryData, CTGHistoryDTO, CTGHistoryState} from "@entities/ctg-history/model/types";
import {ctgHistoryAdapter} from "@entities/ctg-history/model/adapters";
import {fetchAllCTGHistory, fetchAllCTGHistoryAnalysis} from "@entities/ctg-history/api/ctgHistoryThunk";
import {mockGraph} from "@entities/ctg-history/model/mockGraphHistory";
import {CTGStatus, figoToCTGStatus} from "@shared/const/ctgColors";

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
 * @example
 * // Подключение в store:
 * import {configureStore} from "@reduxjs/toolkit";
 * import ctgHistoryReducer from "@entities/ctg-history/model/ctgHistorySlice";
 *
 * const store = configureStore({
 *   reducer: {
 *     ctgHistory: ctgHistoryReducer,
 *   },
 * });
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
      .addCase(fetchAllCTGHistory.fulfilled, (state, action: PayloadAction<CTGHistoryData>) => {
        const {data = null} = action.payload;
        if (data === null) {
          return;
        }
        const newData: CTGHistoryDTO[] = data.map((item) => {
          const res = item.result
            ? {
              ...item.result,
              figo: figoToCTGStatus[item.result.figo] ?? CTGStatus.Normal,
              figo_prognosis: item.result.figo_prognosis
                ? figoToCTGStatus[item.result.figo_prognosis]
                : null,
              accelerations: (item.result as any).accelerations ?? 0,
              accelerations_little: (item.result as any).accelerations_little ?? 0,
            }
            : undefined;

          return {
            ...item,
            graph: item.graph ?? mockGraph,
            result: res as any,
          } as CTGHistoryDTO;
        });

        ctgHistoryAdapter.setAll(state.items, newData);
      })
      .addCase(fetchAllCTGHistoryAnalysis.fulfilled, (state, action: PayloadAction<AnalysisResult>) => {
        state.analysis = action.payload.analysis;
      })
      .addCase(fetchAllCTGHistoryAnalysis.rejected, (state, action: PayloadAction<AnalysisResult>) => {
        state.analysis = null;
      })
  },
});

export default ctgHistorySlice.reducer;
