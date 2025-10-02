import {EntityState} from "@reduxjs/toolkit";
import {SessionUploaded} from "@entities/session-upload";

/** Полный результат КТГ (анализ, вычисляемые метрики) */
export interface CTGResult {
  ctg_id: number;
  gest_age: number | null;
  bpm: number | null;
  uc: number | null;
  figo: string | null;
  figo_prognosis: string | null;
  bhr: number | null;
  amplitude_oscillations: number | null;
  oscillation_frequency: number | null;
  ltv: number | null;
  stv: number | null;
  stv_little: number | null;
  accellations: number | null;
  deceleration: number | null;
  uterine_contractions: number | null;
  fetal_movements: number | null;
  fetal_movements_little: number | null;
  accellations_little: number | null;
  deceleration_little: number | null;
  high_variability: number | null;
  low_variability: number | null;
  loss_signals: number | null;
  timestamp: string; // или Date, если парсишь на фронте
}

/** История КТГ (базовая информация о файле/сессии) */
export interface CTGHistory {
  id: number;
  file_path: string;
  archive_path: string;
  graph?: SessionUploaded;
  result?: CTGResult;  // прикреплённый результат, если есть
}

/** DTO для API: список историй по пациенту */
export interface CTGHistoryData {
  data: CTGHistory[];
}

/** Redux slice state */
export interface CTGHistoryState {
  items: EntityState<CTGHistory, number>;
}
