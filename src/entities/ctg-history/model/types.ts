import {EntityState} from "@reduxjs/toolkit";
import {CTGStatus} from "@shared/const/ctgColors";
import {GraphData} from "@entities/session-upload";

/** DTO: сериализуемый слой (хранится в Redux) */
export interface CTGResultDTO {
  ctg_id: number;
  gest_age: string;
  bpm: number | null;
  uc: number;
  figo: CTGStatus;
  savelyeva_status: CTGStatus;
  fischer_status: CTGStatus;
  figo_prognosis: CTGStatus;
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

/** История в DTO (в Redux) */
export interface CTGHistoryDTO {
  id: number;
  dir_path: string;
  archive_path: string | null;
  graph: GraphData;
  result?: CTGResultDTO;
}

/** Domain: бизнес-логика (Date, вычисляемые поля и т.д.) */
export interface CTGResult extends Omit<CTGResultDTO, "timestamp"> {
  timestamp: Date;
}

/** История в Domain (для бизнес-логики и UI) */
export interface CTGHistory extends Omit<CTGHistoryDTO, "result"> {
  result: CTGResult;
}

/** Redux slice state */
export interface CTGHistoryState {
  items: EntityState<CTGHistoryDTO, number>;
  analysis: string | null;
}

export interface AnalysisResult {
  analysis: string;
}
