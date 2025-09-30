import {AppDispatch} from "@app/store/store";
import {addFhrPoint, addUcPoint} from "@entities/session-stream/model/sessionStreamSlice";
import {StreamData} from "@entities/session-stream/model/types";

export const playSessionEffect =
  (msg: StreamData) => (dispatch: AppDispatch) => {
    if (!msg || typeof msg !== "object") return;

    const t = msg.timestamp * 1000;
    dispatch(addFhrPoint({
      x: t,
      y: msg.bpm
    }));
    dispatch(addUcPoint({
      x: t,
      y: msg.uc
    }))
    return;
  };
