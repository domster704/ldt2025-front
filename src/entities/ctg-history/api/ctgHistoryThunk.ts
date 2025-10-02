import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkApi} from "@shared/types/types";
import {AnalysisResult, CTGHistoryData} from "@entities/ctg-history/model/types";
import {$apiUrl} from "@shared/const/constants";

/**
 * Асинхронный thunk для загрузки всей истории КТГ (Cardiotocography History).
 *
 * ### Основные задачи:
 * - Отправляет `GET`-запрос на `${$apiUrl}/history`.
 * - Получает список исторических данных КТГ с бэкенда.
 * - Возвращает результат в формате {@link CTGHistoryData}, который попадает в Redux-хранилище.
 *
 * ### Использование в slice:
 * Этот thunk можно обрабатывать в `extraReducers`:
 * ```ts
 * builder.addCase(fetchAllCTGHistory.fulfilled, (state, action) => {
 *   state.items = action.payload.data;
 * });
 * ```
 *
 * ### Типизация:
 * - `CTGHistoryData` — ожидаемый формат ответа (обычно `{ data: CTGHistoryDTO[] }`).
 * - `void` — thunk не принимает аргументов.
 * - {@link ThunkApi} — общая типизация thunk'ов (содержит `state`, `dispatch`, `rejectValue`).
 *
 * @async
 * @function fetchAllCTGHistory
 * @throws {Error} Если сервер вернёт невалидный JSON или произойдёт ошибка сети.
 *
 * @example
 * import {useAppDispatch} from "@app/store/store";
 * import {fetchAllCTGHistory} from "@entities/ctg-history/api/ctgHistoryThunk";
 *
 * const dispatch = useAppDispatch();
 *
 * useEffect(() => {
 *   dispatch(fetchAllCTGHistory());
 * }, [dispatch]);
 */
export const fetchAllCTGHistory = createAsyncThunk<CTGHistoryData, number, ThunkApi>(
  'ctg/fetchAllCTGHistory',
  async (patientId: number, {getState}) => {
    const response = await fetch(`${$apiUrl}/http/crud/ctg_histories?patient=${patientId}`, {
      method: 'GET'
    });

    return {
      "data": await response.json()
    } as CTGHistoryData;
  }
);

export const fetchAllCTGHistoryAnalysis = createAsyncThunk<AnalysisResult, number, ThunkApi>(
  'ctg/fetchAllCTGHistoryAnalysis',
  async (patientId: number, {getState}) => {
    const response = await fetch(`${$apiUrl}/ml/analizing/${patientId}`, {
      method: 'GET'
    });

    return await response.json() as AnalysisResult;
  }
);
