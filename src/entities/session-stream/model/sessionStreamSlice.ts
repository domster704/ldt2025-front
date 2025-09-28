import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {StreamPoint, StreamState} from "@entities/session-stream/model/types";
import {ColorHealthStatus} from "@shared/providers/color-provider/model/types";

const initialState: StreamState = {
  results: [],
  heartRates: [],
  uterineContractions: [],
  status: ColorHealthStatus.GOOD
};

const sessionStreamSlice = createSlice({
  name: "sessionStream",
  initialState,
  reducers: {
    addResult: (state, action: PayloadAction<any>) => {
      state.results.push(action.payload);
    },
    addFhrPoint: (state, action: PayloadAction<StreamPoint>) => {
      state.heartRates.push(action.payload);
    },
    addUcPoint: (state, action: PayloadAction<StreamPoint>) => {
      state.uterineContractions.push(action.payload);
    },
    resetStream: () => initialState
  },
});

export const {
  addResult,
  addFhrPoint,
  addUcPoint,
  resetStream
} = sessionStreamSlice.actions;
export default sessionStreamSlice.reducer;