import {CTGStatus, NotificationColor} from "@shared/const/ctgColors";

export interface StreamPoint {
  x: number;
  y: number;
}

export interface NotificationEntry {
  time: number;
  message: string;
  color: NotificationColor;
}

export interface ProcessNotification {
  message: string;
  color: NotificationColor;
}

export interface STVForecast {
  stv_3m: number | null,
  stv_5m: number | null,
  stv_10m: number | null,
}

export interface ProcessInfo {
  time_sec: number;
  notifications: Record<number, ProcessNotification[]>;
  figo_situation: string | null;
  current_fhr: number | null;
  current_uterus: number | null;
  stv: number | null;
  stv_forecast: STVForecast | null;
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
  status: CTGStatus;
  streaming: boolean;
  startTime: number | null;
}
