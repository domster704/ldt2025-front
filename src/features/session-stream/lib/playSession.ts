// src/features/session-stream/lib/playSession.ts
import {AppDispatch} from "@app/store/store";
import {MonitoringSession} from "@entities/session-upload/model/types";
import {addFhrPoint, addUcPoint, resetStream} from "@entities/session-stream/model/sessionStreamSlice";

const STEP = 10;

export function playSession(session: MonitoringSession, dispatch: AppDispatch) {
  dispatch(resetStream());

  let totalDelay = 0;

  session.heartRate.forEach((point, i) => {
    if (typeof point.value !== "number" || isNaN(point.value)) return;

    let delay = 0;
    if (i > 0) {
      delay = (point.time - session.heartRate[i - 1].time) * 1000;
    }
    totalDelay += delay;

    setTimeout(() => {
      dispatch(addFhrPoint({ x: i * STEP, y: point.value as number }));
    }, totalDelay);
  });

  session.uterineContractions.forEach((point, i) => {
    let delay = 0;
    if (i > 0) {
      delay = (point.time - session.uterineContractions[i - 1].time) * 1000;
    }
    totalDelay += delay;

    setTimeout(() => {
      dispatch(addUcPoint({ x: i * STEP, y: point.value as number }));
    }, totalDelay);
  });
}
