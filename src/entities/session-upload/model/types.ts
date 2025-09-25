import {EntityState} from "@reduxjs/toolkit";

export interface DataPoint {
  time_sec: number;
  value: number;
}

export interface SessionUploaded {
  id: string;
  bpm: DataPoint[];
  uc: DataPoint[];
  meta?: {
    source?: string;
    uploadedAt: Date;
  }
}

export interface UploadState {
  session: SessionUploaded | null;
}

export interface SessionUploadedState {
  items: EntityState<SessionUploaded, string>;
  loading: boolean;
}