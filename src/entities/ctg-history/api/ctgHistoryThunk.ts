import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkApi} from "@shared/types/types";
import {CTGHistoryData} from "@entities/ctg-history/model/types";
import {$apiUrl} from "@shared/const/constants";

export const fetchAllCTGHistory = createAsyncThunk<CTGHistoryData, void, ThunkApi>(
  'ctg/fetchAllCTGHistory',
  async (_, {getState}) => {
    const response = await fetch(`${$apiUrl}/history`, {
      method: 'GET'
    });

    return await response.json() as CTGHistoryData;
  }
);
