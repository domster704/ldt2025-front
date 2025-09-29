import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CTGHistoryData, CTGHistoryState} from "@entities/ctg-history/model/types";
import {ctgHistoryAdapter} from "@entities/ctg-history/model/adapters";
import {fetchAllCTGHistory} from "@entities/ctg-history/api/ctgHistoryThunk";
import {mockHistory} from "@entities/ctg-history/model/mockData";

const initialState: CTGHistoryState = {
  items: ctgHistoryAdapter.setAll(
    ctgHistoryAdapter.getInitialState(),
    mockHistory
  )
};

const ctgHistorySlice = createSlice({
  name: 'ctgHistory',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllCTGHistory.fulfilled, (state, action: PayloadAction<CTGHistoryData>) => {
        const {data = null} = action.payload;
        if (data === null) {
          return;
        }

        ctgHistoryAdapter.setAll(state.items, data);
      })
  },
});

export default ctgHistorySlice.reducer;
