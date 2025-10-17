import {useContext} from "react";
import {CTGHistorySelectionContext} from "@features/ctg-history-selection-provider/lib/context";

/**
 * Кастомный хук для работы с контекстом выбора КТГ-истории.
 *
 * 🔹 Оборачивает {@link useContext} для {@link CTGHistorySelectionContext}.
 * Гарантирует, что хук используется только внутри провайдера {@link CTGHistorySelectionProvider}.
 *
 * ---
 * ### Что возвращает:
 * Объект контекста:
 * - `selected: number[]` — массив id выбранных КТГ-записей.
 * - `toggle(id: number)` — переключение выбора записи.
 * - `clear()` — очистка выбора.
 *
 * ---
 * ### Ошибки:
 * - Если хук вызван вне `CTGHistorySelectionProvider`, выбрасывает исключение:
 *   `"useCTGHistory must be used within CTGHistorySelectionProvider"`.
 */
export function useCTGHistory() {
  const ctx = useContext(CTGHistorySelectionContext);
  if (!ctx) {
    throw new Error("useCTGHistory must be used within CTGHistorySelectionProvider");
  }
  return ctx;
}
