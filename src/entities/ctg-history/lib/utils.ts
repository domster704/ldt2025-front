import {CTGHistory} from "@entities/ctg-history/model/types";
import {CTGStatus} from "@shared/const/ctgColors";
import {getColorByCTGStatus} from "@shared/lib/utils/ctgColorUtils";

export function formatHeader(ctg: CTGHistory) {
  const date = ctg.result?.timestamp?.toLocaleDateString("ru-RU");
  const gest = ctg.result?.gest_age ?? "";
  return `${date ?? "—"}\n${gest}`;
}

export function formatValue(value: unknown) {
  if (value instanceof Date) return value.toLocaleDateString();
  if (value == null) return "—";
  return String(value);
}

export function getValue(obj: any, path: string) {
  return path.split(".").reduce((acc, part) => acc?.[part], obj);
}

export function getFIGOBg(value: CTGStatus): string | undefined {
  if (!value) return;
  return getColorByCTGStatus(value);
}