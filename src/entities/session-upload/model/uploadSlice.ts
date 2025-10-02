import {createSlice} from "@reduxjs/toolkit";
import {SessionUploadedState} from "@entities/session-upload/model/types";

const initialState: SessionUploadedState = {
  loading: false
};

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {},
  extraReducers: builder => {
  }
});

export const {} = uploadSlice.actions;
export default uploadSlice.reducer;