import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {StreamPoint, StreamState} from "@entities/session-stream/model/types";
import {ColorHealthStatus} from "@app/providers/color-provider/model/types";

const initialState: StreamState = {
  results: [],
  heartRates: [],
  uterineContractions: [],
  status: ColorHealthStatus.Good,
  streaming: false
};

const sessionStreamSlice = createSlice({
  name: "sessionStream",
  initialState,
  reducers: {
    startStreaming: (state) => {
      state.streaming = true;
      state.results = [];
      state.heartRates = [];
      state.uterineContractions = [];
    },
    stopStreaming: (state) => {
      state.streaming = false;
    },
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
  startStreaming,
  stopStreaming,
  addResult,
    addFhrPoint,
  addUcPoint,
  resetStream
} = sessionStreamSlice.actions;

export default sessionStreamSlice.reducer;
