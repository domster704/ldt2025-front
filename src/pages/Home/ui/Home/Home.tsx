import React, {FC, useContext, useEffect} from 'react';
import * as style from './Home.module.css'
import {useAppDispatch} from "@app/store/store";
import {WebsocketContext} from "@shared/providers/websocket/lib/context";
import Threshold from "@widgets/Threshold";

let i = 0;

const Home: FC = (props) => {
  const [ready, value, send] = useContext(WebsocketContext);

  // useEffect(() => {
  //   if (!send || !ready) {
  //     return;
  //   }
  //
  //   const interval = setInterval(() => {
  //     send(i++ + '')
  //   }, 100)
  //
  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [ready, send]);

  const dispatch = useAppDispatch();

  return (
    <main className={style.main}>
      <Threshold/>
    </main>
  );
}

export default Home;