import {AppDispatch} from "@app/store/store";
import {SessionUploaded} from "@entities/session-upload/model/types";
import {addFhrPoint, addUcPoint, resetStream} from "@entities/session-stream/model/sessionStreamSlice";

const SPEED_COEFFICIENT = 1;

type Event = {
  time: number;
  type: "bpm" | "uc";
  value: number;
  index: number;
};

export function playSession(session: SessionUploaded, dispatch: AppDispatch) {
  dispatch(resetStream());

  const events: Event[] = [
    ...session.bpm
      .map((p, i) => ({
        time: p.time_sec,
        type: "bpm" as const,
        value: p.value!,
        index: i
      })),
    ...session.uc
      .map((p, i) => ({
        time: p.time_sec,
        type: "uc" as const,
        value: p.value!,
        index: i
      })),
  ];

  let lastTime = events[0]?.time ?? 0;
  let totalDelay = 0;

  for (const event of events) {
    const delta = (event.time - lastTime) * SPEED_COEFFICIENT;
    totalDelay += delta;
    lastTime = event.time;

    setTimeout(() => {
      if (event.type === "bpm") {
        dispatch(addFhrPoint({x: event.time / 1000, y: event.value}));
      } else {
        dispatch(addUcPoint({x: event.time / 1000, y: event.value}));
      }
    }, totalDelay);
  }
}
