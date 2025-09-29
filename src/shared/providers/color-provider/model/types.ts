export enum ColorHealthStatus {
  Good = 'good',
  Warning = 'warning',
}

export interface Color {
  hex: string;
  rgb: string;
}

export const colors: Record<ColorHealthStatus, Color> = {
  [ColorHealthStatus.Good]: {hex: "#00a619", rgb: "0, 166, 25"},
  [ColorHealthStatus.Warning]: {hex: "#e87000", rgb: "232, 112, 0"},
};