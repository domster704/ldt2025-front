import {ColorHealthStatus} from "@app/providers/color-provider/model/types";

export interface StreamPoint {
  x: number;
  y: number;
}

export interface StreamState {
  results: any[];
  heartRates: StreamPoint[];
  uterineContractions: StreamPoint[];
  status: ColorHealthStatus
}
