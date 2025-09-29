import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Patient, PatientData, PatientState} from "@entities/patient/model/types";
import {fetchAllPatient} from "@entities/patient/api/patientThunk";
import {patientAdapter} from "@entities/patient/model/adapters";
import {mockPatients} from "@entities/patient/model/mockData";

const initialState: PatientState = {
  items: patientAdapter.setAll(
    patientAdapter.getInitialState(),
    mockPatients
  ),
  chosen: null
};

const patientSlice = createSlice({
  name: 'patientSlice',
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
