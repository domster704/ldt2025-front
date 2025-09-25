// src/features/session-stream/lib/playSession.ts
import {AppDispatch} from "@app/store/store";
import {SessionUploaded} from "@entities/session-upload/model/types";
import {addFhrPoint, addUcPoint, resetStream} from "@entities/session-stream/model/sessionStreamSlice";

const STEP = 10;
const SPEED_COEFFICIENT = 0.3;

export function playSession(session: SessionUploaded, dispatch: AppDispatch) {
  dispatch(resetStream());

  let totalDelay = 0;

  session.bpm.forEach((point, i) => {
    if (isNaN(point.value)) return;

    let delay = 0;
    if (i > 0) {
      delay = (point.time_sec - session.bpm[i - 1].time_sec) * 1000 * SPEED_COEFFICIENT;
    }
    totalDelay += delay;

    setTimeout(() => {
      dispatch(addFhrPoint({ x: i * STEP, y: point.value as number }));
    }, totalDelay);
  });

  session.uc.forEach((point, i) => {
    let delay = 0;
    if (i > 0) {
      delay = (point.time_sec - session.uc[i - 1].time_sec) * 1000;
    }
    totalDelay += delay;

    setTimeout(() => {
      dispatch(addUcPoint({ x: i * STEP, y: point.value as number }));
    }, totalDelay);
  });
}
