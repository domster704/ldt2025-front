export const PARAM_GROUPS = [
  [
    {key: "hr", label: "Базальная ЧСС, уд/мин"},
    {key: "osc_amplitude", label: "Амплитуда осцилляций, уд/мин"},
    {key: "osc_frequency", label: "Частота осцилляций, осц/мин"},
  ],
  [
    {key: "ltv", label: "ДВВ (LTV) за сеанс, мс"},
    {key: "stv", label: "КВВ (STV) за сеанс, мс"},
    {key: "stv10", label: "КВВ (STV) за 10 мин, мс"},
  ],
  [
    {key: "acc15", label: "Акцелерации >15 уд/мин"},
    {key: "acc10", label: "Акцелерации >10 уд/мин"},
    {key: "decelerations_all", label: "Децелерации все"},
  ],
  [
    {key: "decelerations_s", label: "Децелерации S >20 ударов"},
    {key: "uc", label: "Сокращений матки"},
    {key: "variability_high", label: "Высокая вариабельность, мин"},
  ],
  [
    {key: "fetal_movements_session", label: "Шевелений плода, за сеанс"},
    {key: "variability_low", label: "Низкая вариабельность, мин"},
    {key: "fetal_movements_hour", label: "Шевелений плода, в час"},
  ],
  [
    {key: "signal_loss", label: "Потеря сигнала (%)"},
  ],
];

export const PREDICTIONS = [
  {key: "figo", label: "КТГ по FIGO"},
  {key: "forecast", label: "Прогноз FIGO"},
];
