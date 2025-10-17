import React from "react";
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
import Anamnesis from "@widgets/anamnesis";
import STVPrediction from "@widgets/stv-predict";
import WidgetsLayout from "@widgets/widgets-layoyt";

const CTGContextPage = () => {
  const streaming = useAppSelector((s) => s.sessionStream.streaming);

  const widgets = [
    {
      id: "indicators",
      layout: {x: 0, y: 0, w: 48, h: 12},
      element: <IndicatorsPanel placement={IndicatorsPanelPlacement.Row}/>,
    },
    {
      id: "logs",
      layout: {x: 0, y: 0, w: 6, h: 20},
      element: <HistoryLogs/>,
    },
    {
      id: "dashboard",
      layout: {x: 6, y: 0, w: 18, h: 20},
      element: (
        <WebsocketProvider wsUrl={$wsApiUrl} enabled={streaming}>
          <DashboardStream/>
        </WebsocketProvider>
      ),
    },
    {
      id: "anamnesis",
      layout: {x: 0, y: 0, w: 12, h: 16},
      element: <Anamnesis/>,
    },
    {
      id: "stv",
      layout: {x: 12, y: 0, w: 12, h: 16},
      element: <STVPrediction/>,
    },
  ];

  return (
    <ColorProvider>
      <ColorSignalWrapper>
        <HeaderGraph/>
        <WidgetsLayout widgets={widgets}
                       storageKey="ctg-context-layout"
        />
        <PreloaderContainer/>
      </ColorSignalWrapper>
    </ColorProvider>
  );
};

export default CTGContextPage;
