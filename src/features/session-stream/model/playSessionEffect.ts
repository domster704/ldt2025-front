import {AppDispatch, RootState} from "@app/store/store";
import {
  addFhrPoint,
  addResult,
  addUcPoint,
  setNotification,
  setStatus
} from "@entities/session-stream/model/sessionStreamSlice";
import {StreamData} from "@entities/session-stream/model/types";
import {classificationToCTGStatus, CTGStatus} from "@shared/const/ctgColors";
import {StreamDataSchema} from "@entities/session-stream/model/schema";
import {ClassificationType} from "@entities/global/model/types";
import {unstable_batchedUpdates} from "react-dom";

const PRECISION: number = 1;

/**
 * Thunk-эффект для обработки входящего сообщения потока данных КТГ.
 *
 * 🔹 Используется для преобразования полученного `StreamData` из WebSocket в экшен'ы Redux.
 *
 * ---
 * ### Алгоритм:
 * 1. Проверяет, что сообщение валидное (объект).
 * 2. Берёт `startTime` из состояния `sessionStream` (или текущую метку времени, если нет).
 * 3. Преобразует `timestamp` из секунд в миллисекунды.
 * 4. Добавляет новые точки:
 *    - ЧСС плода (FHR) через {@link addFhrPoint}.
 *    - Маточные сокращения (UC) через {@link addUcPoint}.
 * 5. Сохраняет результаты анализа из `msg.process` в `results` через {@link addResult}.
 * 6. Добавляет уведомления (`notifications`) через {@link setNotification}.
 * 7. Обновляет статус FIGO с помощью {@link setStatus}, сопоставляя строковое значение через {@link classificationToCTGStatus}.
 *
 * ---
 * ### Параметры:
 * @param msg входящие данные потока ({@link StreamData}).
 */
export const playSessionEffect =
  (msg: StreamData) => (dispatch: AppDispatch, getState: () => RootState) => {
    if (!msg || typeof msg !== "object") return;

    const result = StreamDataSchema.safeParse(msg);
    if (!result.success) {
      console.warn("Неверный формат WS-сообщения", result.error);
      return;
    }
    const data = result.data;

    const state = getState();
    const startTime = state.sessionStream.startTime ?? Date.now();

    const classification = state.global.classification;
    let situation: string | null = null;
    switch (classification) {
      case ClassificationType.FIGO:
        situation = data.process.figo_situation;
        break;
      case ClassificationType.FISCHER:
        situation = data.process.fischer_category;
        break;
      case ClassificationType.SAVELYEVA:
        situation = data.process.savelyeva_category;
        break;
    }

    const ctgStatus =
      classificationToCTGStatus[situation || CTGStatus.Normal.toString()] ??
      CTGStatus.Normal;

    unstable_batchedUpdates(() => {
      for (const point of data.points) {
        const t = point.timestamp * 1000;

        dispatch(addFhrPoint({
          x: startTime + t,
          y: Math.round((point.bpm + Number.EPSILON) * PRECISION) / PRECISION,
        }));

        dispatch(addUcPoint({
          x: startTime + t,
          y: Math.round((point.uc + Number.EPSILON) * PRECISION) / PRECISION,
        }));
      }
      dispatch(addResult(data.process));
      dispatch(setNotification(data.process.notifications));
      dispatch(setStatus(ctgStatus));
    });
  };
