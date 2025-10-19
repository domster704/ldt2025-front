/**
 * Группы параметров для отображения таблицы истории КТГ.
 *
 * Каждая группа представляет собой массив объектов с ключами:
 * - `key` — поле из данных КТГ (см. {@link CTGHistory}).
 * - `label` — человекочитаемое описание параметра (отображается в UI).
 *
 * ### Структура групп:
 * 1. Базовые показатели:
 *   - hr — Базальная ЧСС, уд/мин.
 *   - osc_amplitude — Амплитуда осцилляций, уд/мин.
 *   - osc_frequency — Частота осцилляций, осц/мин.
 *
 * 2. Вариабельность:
 *   - ltv — Долгосрочная вариабельность (LTV), мс.
 *   - stv — Краткосрочная вариабельность (STV) за сеанс, мс.
 *   - stv10 — Краткосрочная вариабельность (STV) за 10 мин, мс.
 *
 * 3. Акцелерации и децелерации:
 *   - acc15 — акцелерации >15 уд/мин.
 *   - acc10 — акцелерации >10 уд/мин.
 *   - decelerations_all — все децелерации.
 *
 * 4. Сокращения и вариабельность:
 *   - decelerations_s — децелерации S >20 ударов.
 *   - uc — маточные сокращения.
 *   - variability_high — высокая вариабельность, мин.
 *
 * 5. Движения плода и низкая вариабельность:
 *   - fetal_movements_session — количество шевелений за сеанс.
 *   - variability_low — низкая вариабельность, мин.
 *   - fetal_movements_hour — количество шевелений в час.
 *
 * 6. Качество сигнала:
 *   - signal_loss — потеря сигнала (%).
 */
export const PARAM_GROUPS = [
  [
    {key: "result.bhr", label: "Базальная ЧСС, уд/мин"},
    {key: "result.amplitude_oscillations", label: "Амплитуда осцилляций, уд/мин"},
    {key: "result.oscillation_frequency", label: "Частота осцилляций, осц/мин"},
  ],
  [
    {key: "result.ltv", label: "ДВВ (LTV) за сеанс, мс"},
    {key: "result.stv", label: "КВВ (STV) за сеанс, мс"},
    {key: "result.stv_little", label: "КВВ (STV) за 10 мин, мс"},
  ],
  [
    {key: "result.accelerations", label: "Акцелерации >15 уд/мин"},
    {key: "result.accelerations_little", label: "Акцелерации >10 уд/мин"},
    {key: "result.deceleration", label: "Децелерации все"},
  ],
  [
    {key: "result.deceleration_little", label: "Децелерации S >20 ударов"},
    {key: "result.uterine_contractions", label: "Сокращений матки"},
    {key: "result.high_variability", label: "Высокая вариабельность, мин"},
  ],
  [
    {key: "result.fetal_movements", label: "Шевелений плода, за сеанс"},
    {key: "result.low_variability", label: "Низкая вариабельность, мин"},
    {key: "result.fetal_movements_little", label: "Шевелений плода, в час"},
  ],
  [
    {key: "result.loss_signals", label: "Потеря сигнала (%)"},
  ],
];

/**
 * Прогностические показатели, вычисляемые по разным классификациям
 */
export const PREDICTIONS = [
  {key: "result.figo", label: "КТГ по FIGO"},
  {key: "result.figo_prognosis", label: "Прогноз FIGO"},
  {key: "result.savelyeva_status", label: "Прогноз Савельевой"},
  {key: "result.fischer_status", label: "Прогноз Фишера"},
];
