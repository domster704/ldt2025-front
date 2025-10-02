import {createContext} from "react";
import {CTGStatus} from "@shared/const/ctgColors";

/**
 * Интерфейс описывает структуру значения,
 * которое хранится и передаётся через {@link ColorContext}.
 */
export interface IColorContext {
  /**
   * Текущий статус КТГ (Cardiotocography).
   *
   * Используется для определения,
   * какой цвет (нормальный или предупреждающий) должен применяться.
   */
  status: CTGStatus;

  /**
   * Объект, содержащий цветовые данные:
   * - hex — строка с цветом в формате HEX (например, `#ff0000`).
   * - rgb — строка с цветом в формате `r, g, b` (например, `"255, 0, 0"`).
   */
  color: {
    /** Цвет в HEX-формате */
    hex: string;

    /** Цвет в RGB-формате (без скобок, только числа через запятую) */
    rgb: string;
  };
}

/**
 * Контекст для передачи текущего статуса КТГ и цветовой схемы приложения.
 *
 * Значение по умолчанию — `null`.
 * Чтобы использовать контекст, необходимо обернуть приложение или часть дерева
 * в {@link ColorProvider}.
 *
 * @see ColorProvider
 *
 * @example
 * ```tsx
 * import {useContext} from "react";
 * import {ColorContext} from "@app/providers/color-provider/lib/context";
 *
 * const Indicator = () => {
 *   const ctx = useContext(ColorContext);
 *
 *   if (!ctx) return null;
 *
 *   return (
 *     <div style={{ backgroundColor: ctx.color.hex }}>
 *       Текущий статус: {ctx.status}
 *     </div>
 *   );
 * };
 * ```
 */
export const ColorContext = createContext<IColorContext | null>(null);
