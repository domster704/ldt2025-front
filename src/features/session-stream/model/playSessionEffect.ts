import {AppDispatch} from "@app/store/store";
import {SessionUploaded} from "@entities/session-upload/model/types";
import {addFhrPoint, addUcPoint, resetStream} from "@entities/session-stream/model/sessionStreamSlice";
import {buildSessionEvents} from "../lib/buildSessionEvents";

const SPEED_COEFFICIENT = 1;

// Глобальные ссылки для отмены предыдущего воспроизведения
let currentRaf: number | null = null;
let cancelFlag = false;

export const playSessionEffect =
  (session: SessionUploaded) => (dispatch: AppDispatch) => {
    // Останавливаем предыдущее проигрывание, если было
    if (currentRaf !== null) {
      cancelFlag = true;
      cancelAnimationFrame(currentRaf);
      currentRaf = null;
    }

    dispatch(resetStream());

    const events = buildSessionEvents(session)
      .sort((a, b) => a.time - b.time);

    if (events.length === 0) return;

    cancelFlag = false;

    const startEventTime = events[0].time; // в миллисекундах (по текущей логике)
    let idx = 0;
    const speed = SPEED_COEFFICIENT;

    const startMono = performance.now();

    const tick = () => {
      if (cancelFlag) return;

      const now = performance.now();
      const elapsedReal = now - startMono; // в мс
      const elapsedPlayed = elapsedReal * speed; // учитываем скорость
      const currentTime = startEventTime + elapsedPlayed;

      // Добавляем все события, которые «наступили» к текущему времени
      while (idx < events.length && events[idx].time <= currentTime) {
        const e = events[idx++];
        const timeSec = e.time / 1000; // x в секундах (как и было)
        const value = e.value;

        if (e.type === "bpm") {
          dispatch(addFhrPoint({x: timeSec, y: value}));
        } else {
          dispatch(addUcPoint({x: timeSec, y: value}));
        }
      }

      if (idx < events.length && !cancelFlag) {
        currentRaf = requestAnimationFrame(tick);
      } else {
        currentRaf = null;
      }
    };

    currentRaf = requestAnimationFrame(tick);
  };
