import React, {FC, useContext, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@app/store/store";
import {selectHeartRates, selectUterineContractions} from "@entities/session-stream/model/selectors";
import {Dashboard} from "@widgets/dashboard";
import * as style from "./DashboardStream.module.css";
import {WebsocketContext} from "@app/providers/websocket-provider/lib/context";
import {playSessionEffect} from "@features/session-stream";
import HistoryLogs from "@widgets/history-logs";

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
    <div className={style.dashboardWithLogs}>
      <HistoryLogs/>
      <Dashboard className={style.dashboardContainer}
                 fhrData={fhrData}
                 ucData={ucData}/>
    </div>
  );
};

export default DashboardStream;
