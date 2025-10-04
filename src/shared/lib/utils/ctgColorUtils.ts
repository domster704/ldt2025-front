import {colorToCTGStatus, ctgColors, CTGStatus, NotificationColor} from "@shared/const/ctgColors";

/**
 * Возвращает цвет ячейки по FIGO-статусу.
 */
export function getColorByCTGStatus(status?: CTGStatus | null): string | undefined {
  if (!status) return undefined;
  return ctgColors[status];
}

/**
 * Возвращает FIGO-статус по цвету уведомления.
 */
export function getCTGStatusByNotification(color: NotificationColor): CTGStatus {
  return colorToCTGStatus[color];
}

/**
 * Возвращает цвет уведомления по его NotificationColor.
 */
export function getColorByNotification(color: NotificationColor): string {
  const status = getCTGStatusByNotification(color);
  return getColorByCTGStatus(status)!;
}
