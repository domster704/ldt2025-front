import {createAppSelector, RootState} from "@app/store/store";
import {ctgHistoryAdapter} from "@entities/ctg-history/model/adapters";
import {CTGHistoryDTO} from "@entities/ctg-history/model/types";

const baseSelector = (state: RootState) => state.ctgHistory.items;
const selectors = ctgHistoryAdapter.getSelectors();
export const selectAllCTGHistory = createAppSelector(
  baseSelector,
  (state) =>
    selectors
      .selectAll(state)
      .map((d: CTGHistoryDTO) => ({
        ...d,
        date: new Date(d.date),
      }))
      .sort((a, b) => a.date.getTime() - b.date.getTime())
);
