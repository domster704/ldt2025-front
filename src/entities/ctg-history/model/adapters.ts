import {createEntityAdapter} from '@reduxjs/toolkit';
import {CTGHistory} from "@entities/ctg-history/model/types";

export const ctgHistoryAdapter = createEntityAdapter<CTGHistory, number>({
  selectId: ctg => ctg.id,
});
