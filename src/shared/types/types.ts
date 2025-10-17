import {AppDispatch, RootState} from "@app/store/store";

/**
 * Унифицированный интерфейс для `createAsyncThunk` в Redux Toolkit.
 *
 * ---
 * ### Назначение:
 * - Позволяет типизировать `thunkApi`, который передаётся во все асинхронные экшены.
 * - Даёт удобный доступ к `state`, `dispatch` и типу значения ошибки (`rejectValue`).
 *
 * ---
 * ### Поля:
 * - `state` — текущее состояние Redux (см. {@link RootState}).
 * - `dispatch` — типизированный диспатч Redux (см. {@link AppDispatch}).
 * - `rejectValue` — значение, которое можно вернуть в случае ошибки (`rejectWithValue`).
 */
export interface ThunkApi {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: any;
}
