import {createEntityAdapter} from '@reduxjs/toolkit';
import {Patient} from "@entities/patient/model/types";

export const patientAdapter = createEntityAdapter<Patient, number>({
  selectId: patient => patient.id,
});
