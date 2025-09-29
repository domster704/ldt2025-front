import React from "react";
import * as style from "./CTGDashboardCharts.module.css";
import FIGOChart from "@shared/ui/figo-chart";
import {useAppSelector} from "@app/store/store";
import {selectAllCTGHistory} from "@entities/ctg-history/model/selectors";
import CTGThresholdCharts from "@widgets/ctg-analysis-dashboard/ui/CTGDashboardCharts/ui";


const CTGDashboardCharts = () => {
  const ctgHistory = useAppSelector(selectAllCTGHistory);


  return (
    <div className={style.charts}>
      <h4 className={style.charts__headerText}>Динамика FIGO по истории КТГ</h4>
      <div className={style.charts__figo}>
        <FIGOChart data={ctgHistory}/>
      </div>

      <CTGThresholdCharts ctgHistory={ctgHistory}/>

      <div className={style.charts__trand}>
        <p><b>Тренд:</b> повышение БЧСС, вероятность такихардии</p>
      </div>
    </div>
  );
};

export default CTGDashboardCharts;
