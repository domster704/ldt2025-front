import React, {FC} from 'react';
import * as style from './Home.module.css'
import Threshold from "@widgets/Threshold";
import UploadData from "@features/upload-data/ui/UploadData";
import StartStreamingButton from "@widgets/StartStreamingButton";
import {WebsocketProvider} from "@shared/providers/websocket/ui/WebsocketProvider";
import {$wsApiUrl} from "@shared/const/constants";


const Home: FC = (props) => {
  return (
    <main className={style.main}>
      <UploadData/>
      <WebsocketProvider wsUrl={$wsApiUrl}>
        <StartStreamingButton/>
        <Threshold/>
      </WebsocketProvider>
    </main>
  );
}

export default Home;