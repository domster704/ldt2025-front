import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MonitoringSession, UploadState} from "@entities/session-upload/model/types";


const initialState: UploadState = {sessions: []};

const uploadSlice  = createSlice({
  name: "upload",
  initialState,
  reducers: {
    addSession: (state, action: PayloadAction<MonitoringSession>) => {
      state.sessions.push(action.payload);
    },
  },
});

export const {addSession} = uploadSlice .actions;
export default uploadSlice .reducer;