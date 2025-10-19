import {IndicatorConfig} from "@shared/types/indicator-zone";

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
    {label: "good", ranges: [[110, 161]]},
    {label: "bad", ranges: [[0, 110], [151, Infinity]]},
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
    {label: "bad", ranges: [[0, 5], [40, Infinity]]},
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

export const ACCELERATION_CONFIG: IndicatorConfig = {
  name: "Акцелерация",
  subLabel: "%",
  zones: [
    {label: "good", ranges: [[5, Infinity]]},
    {label: "bad", ranges: [[0, 5]]},
  ],
};

export const DECELERATION_CONFIG: IndicatorConfig = {
  name: "Децелерация",
  subLabel: "%",
  zones: [
    {label: "good", ranges: [[0, 0]]},
    {label: "bad", ranges: [[1, Infinity]]},
  ],
};