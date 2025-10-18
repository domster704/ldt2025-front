import {IndicatorConfig} from "@shared/types/indicator-zone";

/**
 * Определяет зону состояния (например, «good» или «bad») для числового значения
 * на основе конфигурации индикатора.
 *
 * @param value Числовое значение показателя (или `null` / `undefined`, если данных нет).
 * @param config Конфигурация индикатора с зонами (`IndicatorConfig`).
 * @returns Метка зоны: `"good"` или `"bad"`.
 */
export function getZone(value: number | null | undefined, config: IndicatorConfig): string {
  if (value == null) return "good";

  for (const zone of config.zones) {
    for (const [min, max] of zone.ranges) {
      if (value >= min && value < max) {
        return zone.label;
      }
    }
  }
  return "good";
}