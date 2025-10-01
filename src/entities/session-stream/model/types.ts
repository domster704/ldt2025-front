import {ColorHealthStatus} from "@app/providers/color-provider/model/types";
import {NotificationColor} from "@shared/const/ctgColors";

export interface StreamPoint {
  x: number;
  y: number;
}

export interface TimeRange {
  start: number;
  end: number;
}

export interface NotificationEntry {
  time: number; // мс
  message: string;
  color: NotificationColor;
}

export interface ProcessNotification {
  message: string;
  color: NotificationColor;
}

export interface ProcessInfo {
  time_sec: number;
  notifications: Record<number, ProcessNotification[]>;
  figo_situation: string | null;
  current_fhr: number | null;
  current_uterus: number | null;
  stv: number | null;
  stv_forecast: Record<string, number | null> | null;
  median_fhr_10min: number | null;
  hypoxia_proba: number | null;
}

export interface StreamData {
  bpm: number;
  uc: number;
  timestamp: number;
  process: ProcessInfo;
}

export interface StreamState {
  results: ProcessInfo[];
  heartRates: StreamPoint[];
  uterineContractions: StreamPoint[];
  notifications: NotificationEntry[];
  status: ColorHealthStatus;
  streaming: boolean;
  startTime: number | null;
}
