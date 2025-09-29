import {createEntityAdapter} from '@reduxjs/toolkit';
import {CTGHistory, CTGHistoryDTO} from "@entities/ctg-history/model/types";

export const ctgHistoryAdapter = createEntityAdapter<CTGHistoryDTO, number>({
  selectId: ctg => ctg.id,
});
