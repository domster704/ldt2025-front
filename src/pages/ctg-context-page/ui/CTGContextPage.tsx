import React, {FC} from 'react';
import * as style from './CTGContextPage.module.css'
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

interface CTGContextPageProps {

}

const CTGContextPage: FC<CTGContextPageProps> = ({}) => {
  const streaming = useAppSelector((state) => state.sessionStream.streaming);

  return (
    <>
      <ColorProvider>
        <ColorSignalWrapper>
          <HeaderGraph/>

          <main className={style.contextContainer}>
            <div className={style.context}>
              <div className={style.dashboardWithLogs}>
                <HistoryLogs/>
                <WebsocketProvider wsUrl={$wsApiUrl} enabled={streaming}>
                  <DashboardStream/>
                </WebsocketProvider>
              </div>
              <div className={style.context__analytics}>
                <Anamnesis/>
                <STVPrediction/>
              </div>
            </div>
            <IndicatorsPanel placement={IndicatorsPanelPlacement.Grid}/>
          </main>

        </ColorSignalWrapper>
      </ColorProvider>
      <PreloaderContainer/>
    </>
  );
}

export default CTGContextPage;
