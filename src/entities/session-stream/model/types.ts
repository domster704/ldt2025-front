export interface StreamPoint {
  x: number;
  y: number;
}

export interface StreamState {
  results: any[];
  heartRates: StreamPoint[];
  uterineContractions: StreamPoint[];
}
