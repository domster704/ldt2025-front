import React from "react";
import {useAppSelector} from "@app/store/store";
import {selectHeartRates, selectUterineContractions} from "@entities/session-stream/model/selectors";

import * as style from './Dashboard.module.css';
import SessionChart from "@widgets/session-chart";
import IndicatorsPanel from "@widgets/indicators-panel";


const Dashboard = () => {
  const fhrData = useAppSelector(selectHeartRates);
  const ucData = useAppSelector(selectUterineContractions);

  return (
    <div className={style.dashboard}>
      <div className={style.dashboard__graphs}>
        <SessionChart color={"#c59e00"}
                      dataSource={fhrData}
                      highlightBands={[{
                        from: 110,
                        to: 150,
                        fill: "#ccedd1"
                      }]}/>
        <SessionChart color={"#003459"}
                      dataSource={ucData}/>
      </div>

      <IndicatorsPanel/>
    </div>
  );
};

export default Dashboard;
