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

export interface SessionUploadedState {
  loading: boolean;
}