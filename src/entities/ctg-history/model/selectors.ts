import {createAppSelector, RootState} from "@app/store/store";
import {ctgHistoryAdapter} from "@entities/ctg-history/model/adapters";

const baseSelector = (state: RootState) => state.ctgHistory.items;
const selectors = ctgHistoryAdapter.getSelectors();
export const selectAllCTGHistory = createAppSelector(
  baseSelector,
  (state) =>
    selectors
      .selectAll(state)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
);
