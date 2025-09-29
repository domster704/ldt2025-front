export enum SoundType {
  SensorShift = "sensorShift",
  Warning = "warning",
  Critical = "critical",
}

export interface Sound {
  id: SoundType;
  name: string;
  fileName: string;
  enabled: boolean;
  custom?: boolean;
}
