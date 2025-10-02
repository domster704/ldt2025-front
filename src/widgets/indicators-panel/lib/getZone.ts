import {IndicatorConfig} from "@shared/ui/indicator-container/model/types";

/**
 * Определяет зону состояния (например, «good» или «bad») для числового значения
 * на основе конфигурации индикатора.
 *
 * ---
 * ### Логика:
 * 1. Если значение отсутствует (`null` или `undefined`) → возвращается `"good"` (по умолчанию).
 * 2. Для каждой зоны из {@link IndicatorConfig.zones} проверяются диапазоны (`ranges`).
 * 3. Если значение попадает хотя бы в один диапазон → возвращается метка зоны (`zone.label`).
 * 4. Если значение не попадает ни в один диапазон → возвращается `"good"`.
 *
 * ---
 * ### Пример конфигурации:
 * ```ts
 * const HR_CONFIG: IndicatorConfig = {
 *   name: "БЧСС",
 *   label: "DECG",
 *   subLabel: "уд./мин",
 *   zones: [
 *     { label: "good", ranges: [[110, 150]] },
 *     { label: "bad", ranges: [[0, 109], [151, Infinity]] },
 *   ],
 * };
 * ```
 *
 * ---
 * ### Примеры использования:
 * ```ts
 * getZone(120, HR_CONFIG);  // "good"
 * getZone(80, HR_CONFIG);   // "bad"
 * getZone(null, HR_CONFIG); // "good" (нет данных)
 * ```
 *
 * @param value Числовое значение показателя (или `null` / `undefined`, если данных нет).
 * @param config Конфигурация индикатора с зонами (`IndicatorConfig`).
 * @returns Метка зоны: `"good"` или `"bad"`.
 */
export function getZone(value: number | null | undefined, config: IndicatorConfig): string {
  if (value == null) return "good";

  for (const zone of config.zones) {
    for (const [min, max] of zone.ranges) {
      if (value >= min && value <= max) {
        return zone.label;
      }
    }
  }
  return "good";
}
