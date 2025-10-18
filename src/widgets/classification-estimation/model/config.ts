import {IndicatorConfig} from "@shared/types/indicator-zone";

export const FIGO_CONFIG: IndicatorConfig = {
  name: "FIGO",
  zones: [
    { label: "good", ranges: [[0, 1]] },
    { label: "bad", ranges: [[1, 3]] },
  ],
};

export const FISCHER_AND_SAVELYEVA_CONFIG: IndicatorConfig = {
  name: "Fischer",
  zones: [
    { label: "good", ranges: [[8, 11]] },
    { label: "bad", ranges: [[1, 8]] },
  ],
};