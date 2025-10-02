import {AppDispatch, RootState} from "@app/store/store";
import {
  addFhrPoint,
  addResult,
  addUcPoint,
  setNotification,
  setStatus
} from "@entities/session-stream/model/sessionStreamSlice";
import {StreamData} from "@entities/session-stream/model/types";
import {CTGStatus, figoToCTGStatus} from "@shared/const/ctgColors";

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
 * 7. Обновляет статус FIGO с помощью {@link setStatus}, сопоставляя строковое значение через {@link figoToCTGStatus}.
 *
 * ---
 * ### Параметры:
 * @param msg входящие данные потока ({@link StreamData}).
 *
 * ---
 * ### Пример использования:
 * ```tsx
 * import {useAppDispatch} from "@app/store/store";
 * import {playSessionEffect} from "@features/session-stream/model/playSessionEffect";
 *
 * const dispatch = useAppDispatch();
 *
 * // При получении сообщения из WebSocket
 * socket.onmessage = (event) => {
 *   const data: StreamData = JSON.parse(event.data);
 *   dispatch(playSessionEffect(data));
 * };
 * ```
 */
export const playSessionEffect =
  (msg: StreamData) => (dispatch: AppDispatch, getState: () => RootState) => {
    if (!msg || typeof msg !== "object") return;

    const state = getState();
    const startTime = state.sessionStream.startTime ?? Date.now();

    const t = msg.timestamp * 1000;

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
    dispatch(setStatus(
      figoToCTGStatus[msg.process.figo_situation || CTGStatus.Normal.toString()]
    ));
  };
