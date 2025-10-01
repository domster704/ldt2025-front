import {RootState} from "@app/store/store";

export const selectResults = (state: RootState) => state.sessionStream.results;
export const selectHeartRates = (state: RootState) => state.sessionStream.heartRates;
export const selectUterineContractions = (state: RootState) => state.sessionStream.uterineContractions;

export const selectHealthStatus = (state: RootState) => state.sessionStream.status;

export const selectLastHR = (state: RootState) => state.sessionStream.heartRates.at(-1);
export const selectLastUC = (state: RootState) => state.sessionStream.uterineContractions.at(-1);
export const selectLastSTV = (state: RootState) => state.sessionStream.results.at(-1)?.stv;

export const selectAllNotifications = (state: RootState) =>
  state.sessionStream.notifications;