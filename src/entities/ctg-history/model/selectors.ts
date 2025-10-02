import {createAppSelector, RootState} from "@app/store/store";
import {ctgHistoryAdapter} from "@entities/ctg-history/model/adapters";
import {CTGHistoryDTO} from "@entities/ctg-history/model/types";
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
 *
 * @example
 * ```tsx
 * const history = useAppSelector(selectAllCTGHistory);
 * history.forEach(item => console.log(item.date.toLocaleDateString()));
 * ```
 */
export const selectAllCTGHistory = createAppSelector(
  baseSelector,
  (state) =>
    selectors
      .selectAll(state)
      .map((d: CTGHistoryDTO) => ({
        ...d,
        date: new Date(d.date),
      }))
      .sort((a, b) => a.date.getTime() - b.date.getTime())
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
 *
 * @example
 * ```tsx
 * const ctg = useAppSelector(state => selectCTGHistoryById(state, 5));
 * if (ctg) {
 *   console.log("Дата:", ctg.date.toLocaleDateString());
 * }
 * ```
 */
export const selectCTGHistoryById = createCachedSelector(
  [baseSelector, selectCTGHistoryId],
  (items, id) => {
    const select_: CTGHistoryDTO = selectors.selectById(items, id);
    return {
      ...select_,
      date: new Date(select_.date),
    };
  }
)(
  (_state, id) => id
);