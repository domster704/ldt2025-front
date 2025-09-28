export enum ColorHealthStatus {
  GOOD = 'good',
  WARNING = 'warning',
}

export const colors = {
  [ColorHealthStatus.GOOD]: {hex: "#00a619", rgb: "0, 166, 25"},
  [ColorHealthStatus.WARNING]: {hex: "#e87000", rgb: "232, 112, 0"},
};