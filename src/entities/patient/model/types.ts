import {EntityState} from "@reduxjs/toolkit";

export interface PatientAdditionalInfo {
  diagnosis: string | null,
  blood_gap_ph: number | null,
  blood_gap_co2: number | null,
  blood_gap_glu: number | null,
  blood_gap_lac: number | null,
  blood_gap_be: number | null
}

export interface Patient {
  id: number,
  fio: string
  additional_info: PatientAdditionalInfo | null
}

export interface PatientState {
  items: EntityState<Patient, number>;
  chosen: Patient | null;
}

export interface PatientData {
  data: Patient[];
}
