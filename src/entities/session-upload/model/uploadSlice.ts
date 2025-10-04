import {createSlice} from "@reduxjs/toolkit";
import {SessionUploadedState} from "@entities/session-upload/model/types";
import {startEmulation} from "@entities/session-upload/api/startEmulationThunk";

const initialState: SessionUploadedState = {
  loading: false
};

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(startEmulation.pending, (state) => {
        state.loading = true;
      })
      .addCase(startEmulation.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(startEmulation.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const {} = uploadSlice.actions;
export default uploadSlice.reducer;