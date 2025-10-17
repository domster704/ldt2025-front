import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProcessInfo, ProcessNotification, StreamPoint, StreamState} from "@entities/session-stream/model/types";
import {CTGStatus} from "@shared/const/ctgColors";

const initialState: StreamState = {
  results: [],
  heartRates: [],
  uterineContractions: [],
  notifications: [],
  status: CTGStatus.None,
  streaming: false,
  startTime: null
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
      state.startTime = Date.now();
    },
    stopStreaming: (state) => {
      state.streaming = false;
    },
    setStatus: (state, action: PayloadAction<CTGStatus>) => {
      state.status = action.payload;
    },
    addResult: (state, action: PayloadAction<ProcessInfo>) => {
      state.results.push(action.payload);
    },
    setNotification: (state, action: PayloadAction<Record<number, ProcessNotification[]>>) => {
      if (!state.startTime) return;
      const notifications = action.payload;
      const base = state.startTime;

      state.notifications = Object
        .entries(notifications)
        .flatMap(([offset, list]) =>
          list.map(n => ({
            time: base + Number(offset) * 1000,
            message: n.message,
            color: n.color,
          }))
        )
        .reverse();
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
  setNotification,
  addResult,
  addFhrPoint,
  addUcPoint,
  resetStream,
  setStatus
} = sessionStreamSlice.actions;

export default sessionStreamSlice.reducer;
