import {createContext} from "react";

/**
 * Интерфейс значения контекста выбора истории КТГ.
 *
 * ### Поля:
 * - `selected: number[]` — массив id выбранных записей истории КТГ.
 *   - Может содержать 0, 1 или 2 элемента.
 *   - Используется для отображения режима просмотра:
 *     - `0` — показываются графики (charts).
 *     - `1` — показываются параметры одного исследования.
 *     - `2` — включается режим сравнения.
 *
 * - `toggle(id: number)` — переключает выбор:
 *   - Если id уже выбран → убирается из списка.
 *   - Если выбран один элемент → добавляет второй.
 *   - Если выбрано два элемента → сохраняет последний и добавляет новый.
 *
 * - `clear()` — очищает выбор (сбрасывает `selected` в пустой массив).
 */
export interface CTGHistorySelectionContextValue {
  selected: number[];
  toggle: (id: number) => void;
  clear: () => void;
}

/**
 * Контекст для управления выбором записей истории КТГ.
 *
 * - Значение по умолчанию: `null`.
 * - Чтобы использовать контекст, необходимо обернуть дерево компонентов
 *   в {@link CTGHistorySelectionProvider}.
 *
 * @example
 * ```tsx
 * import {useCTGHistory} from "@features/ctg-history-selection-provider";
 *
 * const HistoryRow = ({id}: {id: number}) => {
 *   const {selected, toggle} = useCTGHistory();
 *   const isSelected = selected.includes(id);
 *
 *   return (
 *     <tr
 *       style={{background: isSelected ? "#eef" : "transparent"}}
 *       onClick={() => toggle(id)}
 *     >
 *       <td>Исследование {id}</td>
 *     </tr>
 *   );
 * };
 * ```
 */
export const CTGHistorySelectionContext = createContext<CTGHistorySelectionContextValue | null>(null);
