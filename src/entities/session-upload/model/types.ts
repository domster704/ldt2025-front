export interface DataPoint {
  time: number;
  value: number;
}

export interface MonitoringSession {
  id: string;
  heartRate: DataPoint[];
  uterineContractions: DataPoint[];
  meta?: {
    source?: string;
    uploadedAt: Date;
  }
}

export interface UploadState {
  sessions: MonitoringSession[];
}