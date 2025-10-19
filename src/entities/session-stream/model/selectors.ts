import {RootState} from "@app/store/store";
import {SituationWithScore, STVForecastStatus, STVForecastWithStatus} from "@entities/session-stream/model/types";
import {getZone} from "@shared/lib/utils/getZone";
import {STV_CONFIG} from "@shared/lib/configs/range-configs";
import {createSelector} from "@reduxjs/toolkit";
import {classificationToCTGStatus, CTGStatus} from "@shared/const/ctgColors";

export const selectHeartRates = (state: RootState) => state.sessionStream.heartRates;
export const selectUterineContractions = (state: RootState) => state.sessionStream.uterineContractions;
export const selectAllNotifications = (state: RootState) =>
  state.sessionStream.notifications;


export const selectLastHR = (state: RootState) => state.sessionStream.heartRates.at(-1);
export const selectLastUC = (state: RootState) => state.sessionStream.uterineContractions.at(-1);
export const selectLastSTV = (state: RootState) => state.sessionStream.results.at(-1)?.stv;
export const selectLastFIGO = (state: RootState) => state.sessionStream.results.at(-1)?.figo_situation;
export const selectLastFischer = (state: RootState) => state.sessionStream.results.at(-1)?.fischer_category;
export const selectLastSavelyeva = (state: RootState) => state.sessionStream.results.at(-1)?.savelyeva_category;
export const selectLastHypoxiaProbability = (state: RootState) => state.sessionStream.results.at(-1)?.hypoxia_proba;
export const selectLastAccelerationCount = (state: RootState) => state.sessionStream.results.at(-1)?.accelerations_count;
export const selectLastDecelerationCount = (state: RootState) => state.sessionStream.results.at(-1)?.decelerations_count;

// Оценка состояния по классификациям
// FIGO
export const selectLastFIGOSituation = createSelector(
  (state: RootState) => state.sessionStream.results.at(-1),
  (last): SituationWithScore => {
    const ctgStatus = last?.figo_situation ? classificationToCTGStatus[last?.figo_situation] : null;

    return {
      situation: last?.figo_situation ?? null,
      score:
        ctgStatus === CTGStatus.Normal ? 0
          : ctgStatus === CTGStatus.Doubtful ? 1
            : ctgStatus === CTGStatus.Pathological || CTGStatus.Preterminal ? 2
              : null,
    }
  }
);

// Савельева
export const selectLastSavelyevaSituation = createSelector(
  (state: RootState) => state.sessionStream.results.at(-1),
  (last): SituationWithScore => ({
    situation: last?.savelyeva_category ?? null,
    score: last?.savelyeva_score ?? null,
  })
);

// Фишер
export const selectLastFischerSituation = createSelector(
  (state: RootState) => state.sessionStream.results.at(-1),
  (last): SituationWithScore => ({
    situation: last?.fischer_category ?? null,
    score: last?.fischer_score ?? null,
  })
);

/**
 * Селектор возвращает прогноз STV (3м, 5м, 10м)
 * вместе с определением статуса ("Нормальная" или "Аномальная")
 * на основе STV_CONFIG.
 */
export const selectLastSTVForecast = (state: RootState): STVForecastWithStatus | null => {
  const forecast = state.sessionStream.results.at(-1)?.stv_forecast;
  if (!forecast) return null;

  const mapValue = (value: number | null): STVForecastStatus => {
    const zone = getZone(value, STV_CONFIG);
    return {
      value,
      status: zone === "bad" ? "Аномальная" : "Нормальная",
    };
  };

  return {
    stv_3m: mapValue(forecast.stv_3m),
    stv_5m: mapValue(forecast.stv_5m),
    stv_10m: mapValue(forecast.stv_10m),
  };
};