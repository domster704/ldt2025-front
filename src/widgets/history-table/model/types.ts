import {HistoryStatus} from "@entities/ctg-history/model/types";

export const historyColors: Record<HistoryStatus, string> = {
  [HistoryStatus.Normal]: "#83e462",
  [HistoryStatus.Doubtful]: "#ffa653",
  [HistoryStatus.DoubtfulAlt]: "#ffa653",
  [HistoryStatus.Pathological]: "#ff7053",
  [HistoryStatus.Preterminal]: "#d9bbff",
};
