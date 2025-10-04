import {EntityState} from "@reduxjs/toolkit";
import {SessionUploaded} from "@entities/session-upload";
import {CTGStatus} from "@shared/const/ctgColors";

/** Полный результат КТГ (анализ, вычисляемые метрики) */
export interface CTGResultAPI {
  ctg_id: number;
  gest_age: string;
  bpm: number;
  uc: number;
  figo: string;
  figo_prognosis: string;
  bhr: number;
  amplitude_oscillations: number;
  oscillation_frequency: number;
  ltv: number;
  stv: number;
  stv_little: number;
  accelerations: number;
  deceleration: number;
  uterine_contractions: number;
  fetal_movements: number;
  fetal_movements_little: number;
  accelerations_little: number;
  deceleration_little: number;
  high_variability: number;
  low_variability: number;
  loss_signals: number;
  timestamp: string;
}

export interface CTGHistoryAPI {
  id: number | null;
  dir_path: string;
  archive_path: string | null;
  result?: CTGResultAPI;
  graph: SessionUploaded;
}

export interface CTGResultDTO extends Omit<CTGResultAPI, 'figo' | 'figo_prognosis'> {
  figo: CTGStatus;
  figo_prognosis: CTGStatus | null;
}

export interface CTGResult extends Omit<CTGResultDTO, 'timestamp'> {
  timestamp: Date;
}

/** История КТГ (базовая информация о файле/сессии) */
export interface CTGHistoryDTO extends Omit<CTGHistoryAPI, 'result'> {
  result?: CTGResultDTO;
}

export interface CTGHistory extends Omit<CTGHistoryAPI, 'result'> {
  result: CTGResult;
}


/** DTO для API: список историй по пациенту */
export interface CTGHistoryData {
  data: CTGHistoryAPI[];
}

/** Redux slice state */
export interface CTGHistoryState {
  items: EntityState<CTGHistoryDTO, number>;
  analysis: string | null;
}

export interface AnalysisResult {
  analysis: string;
}