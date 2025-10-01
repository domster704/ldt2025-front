import {IndicatorConfig} from "@shared/ui/indicator-container/model/types";

export const HR_CONFIG: IndicatorConfig = {
  name: "БЧСС",
  label: "DECG",
  subLabel: "уд./мин",
  zones: [
    {label: "good", ranges: [[110, 150]]},
    {label: "bad", ranges: [[0, 109], [151, Infinity]]},
  ],
};

export const STV_CONFIG: IndicatorConfig = {
  name: "Вариабельность",
  label: "STV",
  subLabel: "мс",
  zones: [
    {label: "good", ranges: [[3, Infinity]]},
    {label: "bad", ranges: [[0, 2.9]]},
  ],
};

export const UC_CONFIG: IndicatorConfig = {
  name: "Маточная активность",
  label: "TOCO",
  subLabel: "%",
  zones: [
    {label: "good", ranges: [[0, 60]]},
    {label: "bad", ranges: [[61, Infinity]]},
  ],
};