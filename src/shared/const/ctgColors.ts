export enum CTGStatus {
  Normal = "Нормальный",
  Doubtful = "Сомнительный",
  Pathological = "Патологическая",
  Preterminal = "Претерминальная",
}

export const ctgColors: Record<CTGStatus, string> = {
  [CTGStatus.Normal]: "#83e462",
  [CTGStatus.Doubtful]: "#ffa653",
  [CTGStatus.Pathological]: "#ff7053",
  [CTGStatus.Preterminal]: "#d9bbff",
};

export enum NotificationColor {
  RED = "red",
  GREEN = "green",
  YELLOW = "yellow",
  PURPLE = "purple"
}

export const colorToCTGStatus: Record<NotificationColor, CTGStatus> = {
  [NotificationColor.GREEN]: CTGStatus.Normal,
  [NotificationColor.YELLOW]: CTGStatus.Doubtful,
  [NotificationColor.RED]: CTGStatus.Pathological,
  [NotificationColor.PURPLE]: CTGStatus.Preterminal,
};

export const figoToCTGStatus: Record<string, CTGStatus> = {
  "Нормальное": CTGStatus.Normal,
  "Сомнительное": CTGStatus.Doubtful,
  "Патологическое": CTGStatus.Pathological,
  "Претерминальное": CTGStatus.Preterminal,
};