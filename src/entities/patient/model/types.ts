import {EntityState} from "@reduxjs/toolkit";

export interface Patient {
  id: number,
  name: string
}

export interface PatientState {
  items: EntityState<Patient, number>;
  chosen: Patient | null;
}

export interface PatientData {
  data: Patient[];
}
