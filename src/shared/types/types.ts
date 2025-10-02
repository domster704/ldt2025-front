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
 *
 * ---
 * @example
 * ```ts
 * import {createAsyncThunk} from "@reduxjs/toolkit";
 * import {ThunkApi} from "@shared/types/types";
 *
 * // Асинхронный thunk с типизацией
 * export const fetchUser = createAsyncThunk<User, number, ThunkApi>(
 *   "user/fetchById",
 *   async (userId, {dispatch, getState, rejectWithValue}) => {
 *     try {
 *       const res = await fetch(`/api/users/${userId}`);
 *       if (!res.ok) throw new Error("Ошибка загрузки");
 *       return (await res.json()) as User;
 *     } catch (err) {
 *       return rejectWithValue(err);
 *     }
 *   }
 * );
 * ```
 */
export interface ThunkApi {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: any;
}
