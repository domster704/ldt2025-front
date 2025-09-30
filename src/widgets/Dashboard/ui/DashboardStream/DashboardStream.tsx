import React, {FC} from "react";
import {useAppSelector} from "@app/store/store";
import {selectHeartRates, selectUterineContractions} from "@entities/session-stream/model/selectors";
import {Dashboard} from "@widgets/dashboard";
import * as style from "./DashboardStream.module.css";
import IndicatorsPanel from "@widgets/indicators-panel";

const DashboardStream: FC = ({}) => {
  const fhrData = useAppSelector(selectHeartRates);
  const ucData = useAppSelector(selectUterineContractions);

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
