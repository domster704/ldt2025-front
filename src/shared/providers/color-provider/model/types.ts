export enum ColorHealthStatus {
  Good = 'good',
  Warning = 'warning',
  Pathological = 'pathological',
  Preterminal = 'preterminal',
}

export interface Color {
  hex: string;
  rgb: string;
}

export const colors: Record<ColorHealthStatus, Color> = {
  [ColorHealthStatus.Good]: {hex: "#00a619", rgb: "0, 166, 25"},
  [ColorHealthStatus.Warning]: {hex: "#e87000", rgb: "232, 112, 0"},
  [ColorHealthStatus.Pathological]: {hex: "#ff7053", rgb: "255, 112, 83"},
  [ColorHealthStatus.Preterminal]: {hex: "#d9bbff", rgb: "217, 187, 255"},
};