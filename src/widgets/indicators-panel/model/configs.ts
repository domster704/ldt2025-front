import {IndicatorConfig} from "@shared/ui/indicator-container/model/types";

/**
 * Конфигурация индикатора для **Базальной частоты сердечных сокращений (БЧСС)**.
 *
 * ---
 * ### Зоны:
 * - `"good"` → диапазон **110–150 уд/мин**.
 * - `"bad"` → ниже 110 или выше 150.
 */
export const HR_CONFIG: IndicatorConfig = {
  name: "БЧСС",
  label: "DECG",
  subLabel: "уд./мин",
  zones: [
    {label: "good", ranges: [[110, 150]]},
    {label: "bad", ranges: [[0, 109], [151, Infinity]]},
  ],
};

/**
 * Конфигурация индикатора для **вариабельности (STV)**.
 *
 * ---
 * ### Зоны:
 * - `"good"` → диапазон **5–25 мс** и **25–40 мс**.
 * - `"bad"` → ниже 5 мс или выше 40 мс.
 *
 * Такая логика используется для оценки кратковременной вариабельности КТГ.
 */
export const STV_CONFIG: IndicatorConfig = {
  name: "Вариабельность",
  label: "STV",
  subLabel: "мс",
  zones: [
    {label: "good", ranges: [[5, 25], [25, 40]]},
    {label: "bad", ranges: [[0, 4.99], [40, Infinity]]},
  ],
};

/**
 * Конфигурация индикатора для **маточной активности (UC/TOCO)**.
 *
 * ---
 * ### Зоны:
 * - `"good"` → любое значение (0 → ∞).
 * - `"bad"` → отсутствуют (пустой массив).
 *
 * Здесь "плохой зоны" не выделяется, так как UC трактуется как динамический параметр.
 */
export const UC_CONFIG: IndicatorConfig = {
  name: "Маточная активность",
  label: "TOCO",
  subLabel: "%",
  zones: [
    {label: "good", ranges: [[0, Infinity]]},
    {label: "bad", ranges: []},
  ],
};
