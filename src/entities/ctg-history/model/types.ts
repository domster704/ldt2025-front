import {EntityState} from "@reduxjs/toolkit";

export enum HistoryStatus {
  Normal = "Нормальный",
  Doubtful = "Сомнительный",
  Pathological = "Патологическая",
  Preterminal = "Претерминальная",
}

export interface CTGHistory {
  id: number;
  date: Date;
  gestation: string;
  figo: HistoryStatus;
  forecast: HistoryStatus;

  stv: number;
  hr: number;
  uc: number;
  acceleration : number;
}

export interface CTGHistoryState {
  items: EntityState<CTGHistory, number>;
}

export interface CTGHistoryData {
  data: CTGHistory[];
}

export const historyColors: Record<HistoryStatus, string> = {
  [HistoryStatus.Normal]: "#83e462",
  [HistoryStatus.Doubtful]: "#ffa653",
  [HistoryStatus.Pathological]: "#ff7053",
  [HistoryStatus.Preterminal]: "#d9bbff",
};
