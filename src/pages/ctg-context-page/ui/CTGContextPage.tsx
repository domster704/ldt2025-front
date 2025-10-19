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
import WidgetsLayout from "@widgets/widgets-layout";
import ClassificationEstimation from "@widgets/classification-estimation";

const GRID_ROWS = 36;
const GRID_COLUMNS = 48;

const CTGContextPage = () => {
  const widgets = [
    {
      id: "logs",
      layout: {x: 0, y: 0, w: 7, h: 22},
      element: <HistoryLogs/>,
    },
    {
      id: "dashboard",
      layout: {x: 7, y: 0, w: 30, h: 22},
      element: <DashboardStream/>
    },
    {
      id: "indicators",
      layout: {x: 37, y: 0, w: 11, h: 36},
      element: <IndicatorsPanel placement={IndicatorsPanelPlacement.Grid}/>,
    },
    {
      id: "anamnesis",
      layout: {x: 0, y: 22, w: 25, h: 14},
      element: <Anamnesis/>,
    },
    {
      id: "stv",
      layout: {x: 25, y: 22, w: 12, h: 7},
      element: <STVPrediction/>,
    },
    {
      id: "classification-estimation",
      layout: {x: 25, y: 28, w: 12, h: 7},
      element: <ClassificationEstimation/>,
    }
  ];

  return (
    <ColorProvider>
      <ColorSignalWrapper>
        <HeaderGraph/>
        <WidgetsLayout widgets={widgets}
                       storageKey="ctg-context-layout"
                       rows={GRID_ROWS}
                       cols={GRID_COLUMNS}
        />
        <PreloaderContainer/>
      </ColorSignalWrapper>
    </ColorProvider>
  );
};

export default CTGContextPage;
