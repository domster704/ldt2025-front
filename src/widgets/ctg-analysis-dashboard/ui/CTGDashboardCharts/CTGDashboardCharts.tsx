import React from "react";
import * as style from "./CTGDashboardCharts.module.css";

const CTGDashboardCharts = () => {
  return (
    <div className={style.charts}>
      <div className={style.charts__top}>
        {/* FIGO динамика */}
        <h4>Динамика FIGO</h4>
      </div>

      <div className={style.charts__bottom}>
        <div className={style.charts__small}>STV (мс)</div>
        <div className={style.charts__small}>БЧСС (уд/мин)</div>
        <div className={style.charts__small}>Акцелерации (шт)</div>
      </div>
    </div>
  );
};

export default CTGDashboardCharts;
