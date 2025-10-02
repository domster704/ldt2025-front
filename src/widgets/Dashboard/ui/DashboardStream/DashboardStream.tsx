import React, {FC, useContext, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@app/store/store";
import {selectHeartRates, selectUterineContractions} from "@entities/session-stream/model/selectors";
import {Dashboard} from "@widgets/dashboard";
import * as style from "./DashboardStream.module.css";
import {WebsocketContext} from "@app/providers/websocket-provider/lib/context";
import {playSessionEffect} from "@features/session-stream";

/**
 * **DashboardStream** — компонент для отображения графиков КТГ (FHR и UC)
 * в режиме **онлайн-потока** через WebSocket.
 *
 * ---
 * ### Основные задачи:
 * - Подписывается на {@link WebsocketContext}, получая новые сообщения от сервера.
 * - При получении сообщения вызывает {@link playSessionEffect}, который:
 *   - добавляет точки FHR (частоты сердечных сокращений плода),
 *   - добавляет точки UC (маточные сокращения),
 *   - обновляет статус FIGO и нотификации.
 * - Извлекает текущее состояние (серии точек) из Redux Store и передаёт в {@link Dashboard}.
 *
 * ---
 * ### Визуальная структура:
 * ```
 * <Dashboard
 *   fhrData={серия точек ЧСС}
 *   ucData={серия точек UC}
 * />
 * ```
 *
 * ---
 * ### Использование:
 * @example
 * ```tsx
 * import {WebsocketProvider} from "@app/providers/websocket-provider";
 * import DashboardStream from "@widgets/dashboard/ui/DashboardStream";
 * import {$wsApiUrl} from "@shared/const/constants";
 *
 * const Page = () => (
 *   <WebsocketProvider wsUrl={$wsApiUrl} enabled={true}>
 *     <DashboardStream />
 *   </WebsocketProvider>
 * );
 * ```
 */
const DashboardStream: FC = ({}) => {
  const dispatch = useAppDispatch();
  const {message} = useContext(WebsocketContext);

  // Выбираем данные из Redux Store
  const fhrData = useAppSelector(selectHeartRates);
  const ucData = useAppSelector(selectUterineContractions);

  // Обрабатываем новые сообщения WebSocket
  useEffect(() => {
    if (message) {
      dispatch(playSessionEffect(message));
    }
  }, [message, dispatch]);

  return (
    <Dashboard
      className={style.dashboardContainer}
      fhrData={fhrData}
      ucData={ucData}
    />
  );
};

export default DashboardStream;
