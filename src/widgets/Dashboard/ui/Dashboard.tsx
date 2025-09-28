import React from "react";
import {useAppSelector} from "@app/store/store";
import {selectHeartRates, selectUterineContractions} from "@entities/session-stream/model/selectors";

import * as style from './Dashboard.module.css';
import SessionChart from "@widgets/SessionChart";


const Dashboard = () => {
  const fhrData = useAppSelector(selectHeartRates);
  const ucData = useAppSelector(selectUterineContractions);

  return (
    <div className={style.dashboard}>
      <SessionChart color="red" dataSource={fhrData}/>
      <SessionChart color="blue" dataSource={ucData}/>
    </div>
  );
};

export default Dashboard;
