import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Patient, PatientData, PatientState} from "@entities/patient/model/types";
import {fetchAllPatient, fetchPatientByID} from "@entities/patient/api/patientThunk";
import {patientAdapter} from "@entities/patient/model/adapters";

const initialState: PatientState = {
  items: patientAdapter.getInitialState(),
  chosen: null
};

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
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
      .addCase(fetchPatientByID.fulfilled, (state, action: PayloadAction<Patient>) => {
        state.chosen = action.payload;
      })
  },
});

export const {} = patientSlice.actions;
export default patientSlice.reducer;
