import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SessionUploaded, SessionUploadedState} from "@entities/session-upload/model/types";
import {fetchMonitoringSession} from "@entities/session-upload/api/sessionUploadThunk";
import {sessionUploadedAdapter} from "@entities/session-upload/model/adapter";

const initialState: SessionUploadedState = {
  items: sessionUploadedAdapter.getInitialState(),
  loading: false
};

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMonitoringSession.pending, (state, action) => {
        console.log(1)
        state.loading = true;
      })
      .addCase(fetchMonitoringSession.rejected, (state, action) => {
        console.log(3)
        state.loading = false;
      })
      .addCase(fetchMonitoringSession.fulfilled, (state, action: PayloadAction<SessionUploaded>) => {
        console.log(2)
        state.loading = false;
        sessionUploadedAdapter.addOne(state.items, action.payload);
      })
  }
});

export const {} = uploadSlice.actions;
export default uploadSlice.reducer;