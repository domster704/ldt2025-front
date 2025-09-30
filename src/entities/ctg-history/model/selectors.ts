import {createAppSelector, RootState} from "@app/store/store";
import {ctgHistoryAdapter} from "@entities/ctg-history/model/adapters";
import {CTGHistoryDTO} from "@entities/ctg-history/model/types";
import {createCachedSelector} from "re-reselect";

const baseSelector = (state: RootState) => state.ctgHistory.items;
const selectors = ctgHistoryAdapter.getSelectors();
const selectCTGHistoryId = (_: RootState, id: number) => id;
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
export const selectCTGHistoryById = createCachedSelector(
  [baseSelector, selectCTGHistoryId],
  (items, id) => {
    const select_: CTGHistoryDTO = selectors.selectById(items, id);
    return {
      ...select_,
      date: new Date(select_.date),
    };
  }
)(
  (_state, id) => id
);