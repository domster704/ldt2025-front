import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkApi} from "@shared/types/types";
import {AnalysisResult, CTGHistoryDTO} from "@entities/ctg-history/model/types";
import {$apiUrl} from "@shared/const/constants";
import {CTGHistoryAPI, CTGHistoryListSchema, GraphAPI, GraphSchema} from "@entities/ctg-history/api/schemas";
import {mapHistoryApiToDto} from "@entities/ctg-history/model/adapters";

/**
 * Асинхронный thunk для загрузки всей истории КТГ (Cardiotocography History).
 *
 * ### Основные задачи:
 * - Отправляет `GET`-запрос на `${$apiUrl}/history`.
 * - Получает список исторических данных КТГ с бэкенда.
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
 */
export const fetchAllCTGHistory = createAsyncThunk<CTGHistoryDTO[], number, ThunkApi>(
  'ctg/fetchAllCTGHistory',
  async (patientId: number, {rejectWithValue}) => {
    const res = await fetch(`${$apiUrl}/http/crud/ctg_histories?patient=${patientId}`);
    if (!res.ok) {
      throw new Error(`Ошибка загрузки: ${res.statusText}`);
    }

    const json = await res.json();

    const parsed = CTGHistoryListSchema.safeParse(json);
    if (!parsed.success) {
      console.error("Невалидный ответ от API /ctg_histories", parsed.error);
      return rejectWithValue("Invalid API data");
    }

    return parsed.data.map((item: CTGHistoryAPI) => mapHistoryApiToDto(item));
  }
);

export const fetchAllCTGHistoryAnalysis = createAsyncThunk<AnalysisResult, number, ThunkApi>(
  'ctg/fetchAllCTGHistoryAnalysis',
  async (patientId: number) => {
    const response = await fetch(`${$apiUrl}/ml/analizing/${patientId}`, {
      method: 'GET'
    });

    return await response.json() as AnalysisResult;
  }
);

export const fetchCTGHistoryGraph = createAsyncThunk<[number, GraphAPI], number, ThunkApi>(
  'ctg/fetchCTGHistoryGraph',
  async (ctg_id: number, {rejectWithValue}) => {
    try {
      const response = await fetch(`${$apiUrl}/ctg_graphic?ctg_id=${ctg_id}`, {
        method: 'GET'
      });
      const parsed = GraphSchema.parse(await response.json());
      return [ctg_id, parsed as GraphAPI];
    } catch (error: any) {
      console.error("CTGHistoryGraph fetch failed", error);
      return rejectWithValue("CTGHistoryGraph fetch failed")
    }
  }
)