export interface DataPoint {
  time_sec: number;
  value: number;
}

export interface GraphData {
  id: string;
  bpm: DataPoint[];
  uc: DataPoint[];
}

export interface SessionUploadedState {
  loading: boolean;
}