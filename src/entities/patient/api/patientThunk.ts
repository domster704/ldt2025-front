import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkApi} from "@shared/types/types";
import {$apiUrl} from "@shared/const/constants";
import {PatientData} from "@entities/patient/model/types";

export const fetchAllPatient = createAsyncThunk<PatientData, void, ThunkApi>(
  'patient/fetchAllPatient',
  async (_, {getState}) => {
    const response = await fetch(`${$apiUrl}/patient`, {
      method: 'GET'
    });

    return await response.json() as PatientData;
  }
);
