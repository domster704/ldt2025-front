import {RootState} from "@app/store/store";

export const selectHeartRates = (state: RootState) => state.sessionStream.heartRates;
export const selectUterineContractions = (state: RootState) => state.sessionStream.uterineContractions;
export const selectAllNotifications = (state: RootState) =>
  state.sessionStream.notifications;


export const selectLastHR = (state: RootState) => state.sessionStream.heartRates.at(-1);
export const selectLastUC = (state: RootState) => state.sessionStream.uterineContractions.at(-1);
export const selectLastSTV = (state: RootState) => state.sessionStream.results.at(-1)?.stv;
export const selectLastSTVForecast = (state: RootState) => state.sessionStream.results.at(-1)?.stv_forecast;
export const selectLastFIGO = (state: RootState) => state.sessionStream.results.at(-1)?.figo_situation;
export const selectLastHypoxiaProbability = (state: RootState) => state.sessionStream.results.at(-1)?.hypoxia_proba;

