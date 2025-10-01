import {AppDispatch, RootState} from "@app/store/store";
import {addFhrPoint, addResult, addUcPoint, setNotification} from "@entities/session-stream/model/sessionStreamSlice";
import {StreamData} from "@entities/session-stream/model/types";

const PRECISION: number = 1;

export const playSessionEffect =
  (msg: StreamData) => (dispatch: AppDispatch, getState: () => RootState) => {
    if (!msg || typeof msg !== "object") return;

    const state = getState();
    const startTime = state.sessionStream.startTime ?? Date.now();

    const t = msg.timestamp * 1000;
    console.log(msg.process)
    dispatch(addFhrPoint({
      x: startTime + t,
      y: Math.round((msg.bpm + Number.EPSILON) * PRECISION) / PRECISION
    }));
    dispatch(addUcPoint({
      x: startTime + t,
      y: Math.round((msg.uc + Number.EPSILON) * PRECISION) / PRECISION
    }));
    dispatch(addResult(msg.process));
    dispatch(setNotification(msg.process.notifications));
  };

