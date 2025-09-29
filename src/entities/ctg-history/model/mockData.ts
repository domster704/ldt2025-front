import {CTGHistory, HistoryStatus} from "@entities/ctg-history/model/types";

export const mockHistory: CTGHistory[] = [
  {
    id: 1,
    date: new Date("2025-09-07"),
    gestation: "38+2 нед",
    hr: 130,
    uc: 12,
    figo: HistoryStatus.Normal,
    forecast: HistoryStatus.Doubtful,
  },
  {
    id: 2,
    date: new Date("2025-08-07"),
    gestation: "38+1 нед",
    hr: 140,
    uc: 15,
    figo: HistoryStatus.Normal,
    forecast: HistoryStatus.Normal,
  },
  {
    id: 3,
    date: new Date("2025-08-07"),
    gestation: "38+1 нед",
    hr: 140,
    uc: 15,
    figo: HistoryStatus.DoubtfulAlt,
    forecast: HistoryStatus.Pathological,
  },
  {
    id: 4,
    date: new Date("2025-08-07"),
    gestation: "38+1 нед",
    hr: 140,
    uc: 15,
    figo: HistoryStatus.Normal,
    forecast: HistoryStatus.Normal,
  },
];
