import {createAppSelector, RootState} from "@app/store/store";
import {ctgHistoryAdapter, mapHistoryDtoToDomain} from "@entities/ctg-history/model/adapters";
import {createCachedSelector} from "re-reselect";

const baseSelector = (state: RootState) => state.ctgHistory.items;
const selectors = ctgHistoryAdapter.getSelectors();
const selectCTGHistoryId = (_: RootState, id: number) => id;

/**
 * Селектор для получения **всей истории КТГ** в формате `CTGHistory`.
 *
 * 🔹 Логика работы:
 * - Использует адаптер {@link ctgHistoryAdapter} для выборки всех записей.
 * - Преобразует `date: string` из DTO в объект {@link Date}.
 * - Сортирует записи по возрастанию даты (от старых к новым).
 *
 * @param state глобальное состояние Redux
 * @returns массив КТГ-записей, отсортированных по дате
 */
export const selectAllCTGHistory = createAppSelector(baseSelector, (items) =>
  selectors
    .selectAll(items)
    .map(mapHistoryDtoToDomain)
    .sort((a, b) => a.result.timestamp.getTime() - b.result.timestamp.getTime())
);

/**
 * Селектор для получения **одной записи КТГ по её id**.
 *
 * 🔹 Особенности:
 * - Реализован через {@link createCachedSelector} из `re-reselect`
 *   (ключ кэширования — `id`).
 * - Преобразует поле `date` из строки в объект {@link Date}.
 *
 * @param state глобальное состояние Redux
 * @param id идентификатор записи КТГ
 * @returns запись истории КТГ или `undefined`, если id не найден
 */
export const selectCTGHistoryById = createCachedSelector(
  [baseSelector, selectCTGHistoryId],
  (items, id) => {
    const dto = selectors.selectById(items, id);
    return mapHistoryDtoToDomain(dto);
  }
)(
  (_state, id) => id
);

export const selectAnalysisText = (state: RootState) => state.ctgHistory.analysis;