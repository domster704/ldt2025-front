type Ranges = [number, number];

export interface IndicatorZone {
  label: "good" | "bad";
  ranges: Ranges[];
}

export interface IndicatorConfig {
  name: string;
  label: string;
  subLabel: string;
  zones: IndicatorZone[];
}
