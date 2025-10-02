import {createEntityAdapter} from '@reduxjs/toolkit';
import {CTGHistoryDTO} from "@entities/ctg-history/model/types";

/**
 * Entity Adapter для управления коллекцией записей КТГ (Cardiotocography History).
 *
 * ### Основные возможности:
 * - Упрощает работу с массивами сущностей (CRUD-операции).
 * - Предоставляет методы для добавления, удаления, обновления и выборки данных.
 * - Автоматически нормализует состояние в формате:
 * ```ts
 * {
 *   ids: number[],        // массив идентификаторов
 *   entities: { [id]: CTGHistoryDTO } // словарь сущностей по id
 * }
 * ```
 *
 * ### Конфигурация:
 * - Тип сущности: {@link CTGHistoryDTO}.
 * - Тип идентификатора: `number`.
 * - `selectId: (ctg) => ctg.id` — в качестве ключа идентификации используется поле `id`.
 *
 * ### Использование:
 * Внутри `ctgHistorySlice` адаптер применяется для:
 * - Загрузки истории из API (`setAll`).
 * - Поддержки CRUD-операций (например, `addOne`, `updateOne`, `removeOne`).
 * - Генерации мемоизированных селекторов (`getSelectors`).
 *
 * @example
 * // Пример использования в slice:
 * import {createSlice} from "@reduxjs/toolkit";
 * import {ctgHistoryAdapter} from "./adapters";
 *
 * const initialState = ctgHistoryAdapter.getInitialState();
 *
 * const ctgHistorySlice = createSlice({
 *   name: "ctgHistory",
 *   initialState,
 *   reducers: {},
 *   extraReducers: (builder) => {
 *     builder.addCase(fetchAllCTGHistory.fulfilled, (state, action) => {
 *       ctgHistoryAdapter.setAll(state, action.payload.data);
 *     });
 *   },
 * });
 *
 * export default ctgHistorySlice.reducer;
 */
export const ctgHistoryAdapter = createEntityAdapter<CTGHistoryDTO, number>({
  selectId: ctg => ctg.id,
});
