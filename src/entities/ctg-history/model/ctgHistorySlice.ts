import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CTGHistory, CTGHistoryData, CTGHistoryDTO, CTGHistoryState} from "@entities/ctg-history/model/types";
import {ctgHistoryAdapter} from "@entities/ctg-history/model/adapters";
import {fetchAllCTGHistory} from "@entities/ctg-history/api/ctgHistoryThunk";
import {mockGraph} from "@entities/ctg-history/model/mockGraphHistory";
import {figoToCTGStatus} from "@shared/const/ctgColors";

/**
 * Начальное состояние slice истории КТГ.
 *
 * Используется {@link ctgHistoryAdapter}, чтобы:
 * - сгенерировать пустое состояние `getInitialState()`;
 */
const initialState: CTGHistoryState = {
  items: ctgHistoryAdapter.getInitialState()
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
          return {
            ...item,
            graph: mockGraph,
            result: {
              ...item.result,
              figo: item.result?.figo ? figoToCTGStatus[item.result?.figo] : null,
              figo_prognosis: item.result?.figo_prognosis ? figoToCTGStatus[item.result?.figo_prognosis] : null,
            }
          } as CTGHistoryDTO;
        });
        ctgHistoryAdapter.setAll(state.items, newData);
      });
  },
});

export default ctgHistorySlice.reducer;
