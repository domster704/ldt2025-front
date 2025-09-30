import React, {FC, useContext, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@app/store/store";
import {selectHeartRates, selectUterineContractions} from "@entities/session-stream/model/selectors";
import {Dashboard} from "@widgets/dashboard";
import * as style from "./DashboardStream.module.css";
import IndicatorsPanel from "@widgets/indicators-panel";
import {WebsocketContext} from "@app/providers/websocket-provider/lib/context";
import {playSessionEffect} from "@features/session-stream";

const DashboardStream: FC = ({}) => {
  const dispatch = useAppDispatch();
  const {message} = useContext(WebsocketContext);

  const fhrData = useAppSelector(selectHeartRates);
  const ucData = useAppSelector(selectUterineContractions);

  useEffect(() => {
    if (message) {
      dispatch(playSessionEffect(message));
    }
  }, [message, dispatch]);

  return (
    <div className={style.dashboard}>
      <Dashboard className={style.border}
                 fhrData={fhrData}
                 ucData={ucData}/>
      <IndicatorsPanel/>
    </div>
  );
};

export default DashboardStream;
