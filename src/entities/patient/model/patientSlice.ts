import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Patient, PatientData, PatientState} from "@entities/patient/model/types";
import {fetchAllPatient} from "@entities/patient/api/patientThunk";
import {patientAdapter} from "@entities/patient/model/adapters";

const initialState: PatientState = {
  items: patientAdapter.getInitialState(),
  chosen: null
};

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    setChosen(state, action: PayloadAction<Patient>) {
      state.chosen = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllPatient.fulfilled, (state, action: PayloadAction<PatientData>) => {
        const {data = null} = action.payload;
        if (data === null) {
          return;
        }

        patientAdapter.setAll(state.items, data);
      })
  },
});

export const {
  setChosen
} = patientSlice.actions;
export default patientSlice.reducer;
