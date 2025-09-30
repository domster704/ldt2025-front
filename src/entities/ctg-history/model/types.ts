import {EntityState} from "@reduxjs/toolkit";
import {SessionUploaded} from "@entities/session-upload";

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

  graph: SessionUploaded;
}

export interface CTGHistoryDTO extends Omit<CTGHistory, "date">{
  date: string;
}


export interface CTGHistoryState {
  items: EntityState<CTGHistoryDTO, number>;
}

export interface CTGHistoryData {
  data: CTGHistoryDTO[];
}

export const historyColors: Record<HistoryStatus, string> = {
  [HistoryStatus.Normal]: "#83e462",
  [HistoryStatus.Doubtful]: "#ffa653",
  [HistoryStatus.Pathological]: "#ff7053",
  [HistoryStatus.Preterminal]: "#d9bbff",
};
