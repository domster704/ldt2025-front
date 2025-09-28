import {ColorHealthStatus} from "@shared/providers/color-provider/model/types";

export const statusMap: Record<string, ColorHealthStatus> = {
  "Нормальный": ColorHealthStatus.Good,
  "Сомнительный": ColorHealthStatus.Warning,
  "Сомнительная": ColorHealthStatus.Warning,
  "Патологическая": ColorHealthStatus.Pathological,
  "Прогноз неблагоприятный": ColorHealthStatus.Preterminal,
};
