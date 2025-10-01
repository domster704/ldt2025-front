import {IndicatorConfig} from "@shared/ui/indicator-container/model/types";

export function getZone(value: number | null | undefined, config: IndicatorConfig): string {
  if (value == null) return "good";

  for (const zone of config.zones) {
    for (const [min, max] of zone.ranges) {
      if (value >= min && value <= max) {
        return zone.label;
      }
    }
  }
  return "good";
}
