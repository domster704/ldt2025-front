import React, {FC} from 'react';
import * as style from './Home.module.css';
import UploadData from "@features/upload-data/";
import StartStreamingButton from "@widgets/StartStreamingButton";
import Dashboard from "@widgets/Dashboard";
import {useAppSelector} from "@app/store/store";
import {selectLoadingStatus} from "@entities/session-upload/model/selectors";
import {PreLoader} from "@shared/ui/PreLoader";
import HeaderGraph from "@widgets/Header";
import {Footer} from "@widgets/Footer";
import IndicatorWrapper from "@widgets/IndicatorWrapper";
import ColorProvider from "@shared/providers/color-provider";


const Home: FC = () => {
  const isLoading = useAppSelector(selectLoadingStatus);

  return (
    <ColorProvider>
      <IndicatorWrapper>
        <HeaderGraph/>
        <div>
          <main className={style.main}>
            <UploadData/>
            <StartStreamingButton/>
            {/*<WebsocketProvider wsUrl={$wsApiUrl}>*/}
            <Dashboard/>
            {/*</WebsocketProvider>*/}
          </main>

          {
            isLoading &&
              <div className={style.preloaderContainer}>
                  <div className={style.preloaderContent}>
                      <PreLoader/>
                  </div>
              </div>
          }
        </div>
        <Footer/>
      </IndicatorWrapper>
    </ColorProvider>
  );
};

export default Home;