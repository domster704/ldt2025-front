import {EntityState} from "@reduxjs/toolkit";

export enum HistoryStatus {
  Normal = "Нормальный",
  Doubtful = "Сомнительный",
  DoubtfulAlt = "Сомнительная",
  Pathological = "Патологическая",
  Preterminal = "Претерминальная",
}

export interface CTGHistory {
  id: number,
  date: Date,
  gestation: string,
  hr: number,
  uc: number,
  figo: HistoryStatus,
  forecast: HistoryStatus,
}

export interface CTGHistoryState {
  items: EntityState<CTGHistory, number>;
}

export interface CTGHistoryData {
  data: CTGHistory[];
}