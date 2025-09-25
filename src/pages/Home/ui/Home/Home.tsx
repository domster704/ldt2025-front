import React, {FC} from 'react';
import * as style from './Home.module.css';
import UploadData from "@features/upload-data/";
import StartStreamingButton from "@widgets/StartStreamingButton";
import Dashboard from "@widgets/Dashboard";
import {useAppSelector} from "@app/store/store";
import {selectLoadingStatus} from "@entities/session-upload/model/selectors";
import {PreLoader} from "@shared/ui/PreLoader";


const Home: FC = () => {
  const isLoading = useAppSelector(selectLoadingStatus);

  return (
    <>
      <main className={style.main}>
        <UploadData/>
        {/*<WebsocketProvider wsUrl={$wsApiUrl}>*/}
        <StartStreamingButton/>
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
    </>
  );
};

export default Home;