import {RootState} from "@app/store/store";

export const selectResults = (state: RootState) => state.sessionStream.results;
export const selectHeartRates = (state: RootState) => state.sessionStream.heartRates;
export const selectUterineContractions = (state: RootState) => state.sessionStream.uterineContractions;

export const selectHealthStatus = (state: RootState) => state.sessionStream.status;