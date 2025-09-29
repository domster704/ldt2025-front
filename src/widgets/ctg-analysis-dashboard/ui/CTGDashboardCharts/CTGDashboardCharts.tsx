import React from "react";
import * as style from "./CTGDashboardCharts.module.css";
import FIGOChart from "@shared/ui/figo-chart";
import {useAppSelector} from "@app/store/store";
import {selectAllCTGHistory} from "@entities/ctg-history/model/selectors";


const CTGDashboardCharts = () => {
  const ctgHistory = useAppSelector(selectAllCTGHistory);
  console.log(ctgHistory)

  return (
    <div className={style.charts}>
      <h4 className={style.charts__headerText}>Динамика FIGO по истории КТГ</h4>
      <div className={style.charts__figo}>
        <FIGOChart data={ctgHistory}/>
      </div>
      {/*<div className={style.charts__top}>*/}
      {/*  /!* FIGO динамика *!/*/}
      {/*  <h4>Динамика FIGO</h4>*/}
      {/*</div>*/}

      {/*<div className={style.charts__bottom}>*/}
      {/*  <div className={style.charts__small}>STV (мс)</div>*/}
      {/*  <div className={style.charts__small}>БЧСС (уд/мин)</div>*/}
      {/*  <div className={style.charts__small}>Акцелерации (шт)</div>*/}
      {/*</div>*/}
    </div>
  );
};

export default CTGDashboardCharts;
