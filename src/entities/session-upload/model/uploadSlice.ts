import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SessionUploaded, SessionUploadedState} from "@entities/session-upload/model/types";
import {fetchMonitoringSession} from "@entities/session-upload/api/sessionUploadThunk";
import {sessionUploadedAdapter} from "@entities/session-upload/model/adapter";


const initialState: SessionUploadedState = {
  items: sessionUploadedAdapter.getInitialState()
};

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    // addSession: (state, action: PayloadAction<SessionUploaded>) => {
    //   state.session = action.payload;
    // },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMonitoringSession.fulfilled, (state, action: PayloadAction<SessionUploaded>) => {
        sessionUploadedAdapter.addOne(state.items, action.payload);
      })
  }
});

export const {} = uploadSlice.actions;
export default uploadSlice.reducer;