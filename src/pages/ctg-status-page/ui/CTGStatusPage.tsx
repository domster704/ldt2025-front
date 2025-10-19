import React, {FC} from 'react';
import {useAppSelector} from "@app/store/store";
import ColorProvider from "@app/providers/color-provider";
import ColorSignalWrapper from "@widgets/color-signal-wrapper";
import {HeaderGraph} from "@widgets/header";
import {WebsocketProvider} from "@app/providers/websocket-provider/ui/WebsocketProvider";
import {$wsApiUrl} from "@shared/const/constants";
import {DashboardStream} from "@widgets/dashboard";
import PreloaderContainer from "@widgets/preloader-container";
import IndicatorsPanel from "@widgets/indicators-panel";
import {IndicatorsPanelPlacement} from "@widgets/indicators-panel/ui/IndicatorsPanel";
import HistoryLogs from "@widgets/history-logs";
import WidgetsLayout from "@widgets/widgets-layout";


const GRID_ROWS = 36;
const GRID_COLUMNS = 48;

/**
 * Страница "Статус КТГ".
 *
 * ---
 * ### Основные элементы:
 * - {@link ColorProvider} — контекст цветовой схемы (норма / предупреждение).
 * - {@link ColorSignalWrapper} — обёртка для фоновой цветовой индикации состояния.
 * - {@link HeaderGraph} — панель с ФИО пациента, прогнозом и текущим FIGO-статусом.
 * - {@link IndicatorsPanel} (в режиме {@link IndicatorsPanelPlacement.Row}) —
 *   отображает ключевые показатели (ЧСС, STV, UC и др.) в строке под хедером.
 * - {@link HistoryLogs} — список уведомлений (журнал событий за сессию).
 * - {@link DashboardStream} — график ЧСС плода (FHR) и маточной активности (UC),
 *   данные для которого приходят из {@link WebsocketProvider}.
 * - {@link PreloaderContainer} — оверлей-загрузчик, показывается во время загрузки данных.
 *
 * ---
 * ### Логика:
 * - Подключение к WebSocket (`$wsApiUrl`) осуществляется только если включён флаг `streaming` в Redux.
 * - Все данные (графики, статус FIGO, уведомления) обновляются в реальном времени из WebSocket.
 */
const CTGStatusPage: FC = () => {
  const streaming = useAppSelector((state) => state.sessionStream.streaming);

  const widgets = [
    {
      id: "indicators",
      layout: {x: 0, y: 0, w: 48, h: 8},
      element: <IndicatorsPanel placement={IndicatorsPanelPlacement.Row}/>,
    },
    {
      id: "logs",
      layout: {x: 0, y: 8, w: 6, h: 28},
      element: <HistoryLogs/>,
    },
    {
      id: "dashboard",
      layout: {x: 6, y: 8, w: 42, h: 28},
      element: <DashboardStream/>,
    },
  ];

  return (
    <>
      <ColorProvider>
        <ColorSignalWrapper>
          <HeaderGraph/>
          <WidgetsLayout widgets={widgets}
                         storageKey="ctg-status-layout"
                         rows={GRID_ROWS}
                         cols={GRID_COLUMNS}
          />
          <PreloaderContainer/>
        </ColorSignalWrapper>
      </ColorProvider>
      <PreloaderContainer/>
    </>
  );
};

export default CTGStatusPage;
