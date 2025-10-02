import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkApi} from "@shared/types/types";
import {$apiUrl} from "@shared/const/constants";
import {PatientData} from "@entities/patient/model/types";

export const fetchAllPatient = createAsyncThunk<PatientData, void, ThunkApi>(
  'patient/fetchAllPatient',
  async (_, {getState}) => {
    const response = await fetch(`${$apiUrl}/http/crud/patients`, {
      method: 'GET'
    });

    return {
      "data": await response.json()
    } as PatientData;
  }
);

export const fetchPatientByID = createAsyncThunk<PatientData, number, ThunkApi>(
  'patient/fetchPatientByID',
  async (patient_id: number, {getState}) => {
    const response = await fetch(`${$apiUrl}/http/crud/patients/${patient_id}`, {
      method: 'GET'
    });

    return await response.json() as PatientData;
  }
);