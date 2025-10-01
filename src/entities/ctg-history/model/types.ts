import {EntityState} from "@reduxjs/toolkit";
import {SessionUploaded} from "@entities/session-upload";
import {CTGStatus} from "@shared/const/ctgColors";


export interface CTGHistory {
  id: number;
  date: Date;
  gestation: string;
  figo: CTGStatus;
  forecast: CTGStatus;

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