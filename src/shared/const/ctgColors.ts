/**
 * Возможные статусы КТГ (Cardiotocography).
 *
 * Используются для интерпретации результатов FIGO и прогнозов.
 */
export enum CTGStatus {
  None = "",
  Normal = "Нормальный",
  Doubtful = "Сомнительный",
  Pathological = "Патологическая",
  Preterminal = "Претерминальная",
}

/**
 * Цветовая схема для каждого статуса КТГ.
 *
 * Эти цвета применяются для:
 * - отображения статуса FIGO в таблицах;
 * - выделения прогноза;
 * - индикации на графиках и панелях.
 */
export const ctgColors: Record<CTGStatus, string> = {
  [CTGStatus.None]: "#83e462",       // зелёный — норма
  [CTGStatus.Normal]: "#83e462",       // зелёный — норма
  [CTGStatus.Doubtful]: "#ffa653",     // оранжевый — сомнительно
  [CTGStatus.Pathological]: "#ff7053", // красный — патологически
  [CTGStatus.Preterminal]: "#d9bbff",  // фиолетовый — претерминально
};

/**
 * Цвета уведомлений в реальном времени (для сообщений о событиях).
 */
export enum NotificationColor {
  RED = "red",
  GREEN = "green",
  YELLOW = "yellow",
  PURPLE = "purple"
}

/**
 * Сопоставление цвета уведомлений с FIGO-статусами КТГ.
 *
 * Используется в истории уведомлений, чтобы каждое сообщение
 * имело цвет, соответствующий уровню риска.
 */
export const colorToCTGStatus: Record<NotificationColor, CTGStatus> = {
  [NotificationColor.GREEN]: CTGStatus.Normal,
  [NotificationColor.YELLOW]: CTGStatus.Doubtful,
  [NotificationColor.RED]: CTGStatus.Pathological,
  [NotificationColor.PURPLE]: CTGStatus.Preterminal,
};

/**
 * Сопоставление текстового результата FIGO (с сервера) со статусами КТГ.
 *
 * Нужен для преобразования строковых значений в строгие enum'ы.
 *
 * @example
 * ```ts
 * figoToCTGStatus["Нормальное"]; // CTGStatus.Normal
 * ```
 */
export const figoToCTGStatus: Record<string, CTGStatus> = {
  "Нормальное": CTGStatus.Normal,
  "Сомнительное": CTGStatus.Doubtful,
  "Патологическое": CTGStatus.Pathological,
  "Претерминальное": CTGStatus.Preterminal,
};
