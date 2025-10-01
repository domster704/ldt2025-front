import React, {FC} from 'react';
import * as style from './Home.module.css';
import {DashboardStream} from "@widgets/dashboard";
import {useAppSelector} from "@app/store/store";
import {selectLoadingStatus} from "@entities/session-upload/model/selectors";
import PreLoader from "@shared/ui/preloader";
import {HeaderGraph} from "@widgets/header";
import ColorSignalWrapper from "@widgets/color-signal-wrapper";
import ColorProvider from "@app/providers/color-provider";
import {WebsocketProvider} from "@app/providers/websocket-provider/ui/WebsocketProvider";
import {$wsApiUrl} from "@shared/const/constants";
import IndicatorsPanel from "@widgets/indicators-panel";
import {IndicatorsPanelPlacement} from "@widgets/indicators-panel/ui/IndicatorsPanel";

const Home: FC = () => {
  const streaming = useAppSelector((state) => state.sessionStream.streaming);
  const isLoading = useAppSelector(selectLoadingStatus);

  return (
    <>
      <ColorProvider>
        <ColorSignalWrapper>
          <HeaderGraph/>
          <main className={style.main}>
            <WebsocketProvider wsUrl={$wsApiUrl} enabled={streaming}>
              <DashboardStream/>
            </WebsocketProvider>
          </main>
        </ColorSignalWrapper>
      </ColorProvider>
      {
        isLoading &&
          <div className={style.preloaderContainer}>
              <div className={style.preloaderContent}>
                  <PreLoader/>
              </div>
          </div>
      }
    </>
  );
};

export default Home;