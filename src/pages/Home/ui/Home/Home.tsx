import React, {FC} from 'react';
import * as style from './Home.module.css';
import Dashboard from "@widgets/Dashboard";
import {useAppSelector} from "@app/store/store";
import {selectLoadingStatus} from "@entities/session-upload/model/selectors";
import {PreLoader} from "@shared/ui/PreLoader";
import HeaderGraph from "@widgets/Header";
import IndicatorWrapper from "@widgets/IndicatorWrapper";
import ColorProvider from "@shared/providers/color-provider";


const Home: FC = () => {
  const isLoading = useAppSelector(selectLoadingStatus);

  return (
    <>
      <ColorProvider>
        <IndicatorWrapper>
          <HeaderGraph/>
          <main className={style.main}>
            {/*<WebsocketProvider wsUrl={$wsApiUrl}>*/}
            <Dashboard/>
            {/*</WebsocketProvider>*/}
          </main>
        </IndicatorWrapper>
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