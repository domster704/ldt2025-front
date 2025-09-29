import React, {FC} from 'react';
import * as style from './Home.module.css';
import Dashboard from "@widgets/dashboard";
import {useAppSelector} from "@app/store/store";
import {selectLoadingStatus} from "@entities/session-upload/model/selectors";
import PreLoader from "@shared/ui/preloader";
import {HeaderGraph} from "@widgets/header";
import ColorSignalWrapper from "@widgets/color-signal-wrapper";
import ColorProvider from "@shared/providers/color-provider";

const Home: FC = () => {
  const isLoading = useAppSelector(selectLoadingStatus);

  return (
    <>
      <ColorProvider>
        <ColorSignalWrapper>
          <HeaderGraph/>
          <main className={style.main}>
            {/*<WebsocketProvider wsUrl={$wsApiUrl}>*/}
            <Dashboard/>
            {/*</WebsocketProvider>*/}
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