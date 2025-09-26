import React from "react";
import {useAppSelector} from "@app/store/store";
import {selectHeartRates, selectUterineContractions} from "@entities/session-stream/model/selectors";

import * as style from './Dashboard.module.css';
import Chart from "@shared/ui/Chart";


const Dashboard = () => {
  const fhrData = useAppSelector(selectHeartRates);
  const ucData = useAppSelector(selectUterineContractions);

  return (
    <div className={style.dashboard}>
      <Chart color="red" dataSource={fhrData}/>
      <Chart color="blue" dataSource={ucData}/>
    </div>
  );
};

export default Dashboard;
