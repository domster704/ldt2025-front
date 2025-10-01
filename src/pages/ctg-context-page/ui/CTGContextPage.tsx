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

interface CTGContextPageProps {

}

const CTGContextPage: FC<CTGContextPageProps> = ({}) => {
  const streaming = useAppSelector((state) => state.sessionStream.streaming);

  return (
    <>
      <ColorProvider>
        <ColorSignalWrapper>
          <HeaderGraph/>
          <main className={style.context}>
            <WebsocketProvider wsUrl={$wsApiUrl} enabled={streaming}>
              <DashboardStream/>
            </WebsocketProvider>
          </main>
        </ColorSignalWrapper>
      </ColorProvider>
      <PreloaderContainer/>
    </>
  );
}

export default CTGContextPage;
