import React, {FC, useMemo} from 'react';
import * as style from './CTGThresholdCharts.module.css'
import ThresholdChartCard from "@widgets/threshold-chart-card";
import {CTGHistory} from "@entities/ctg-history/model/types";

interface CTGThresholdChartsProps {
  ctgHistory: CTGHistory[]
}

const CTGThresholdCharts: FC<CTGThresholdChartsProps> = ({ctgHistory}) => {
  const stvData = useMemo(() => {
    return ctgHistory.map((item) => {
      return {
        value: item.stv,
        date: item.date
      }
    })
  }, [ctgHistory.length]);

  const hrData = useMemo(() => {
    return ctgHistory.map((item) => {
      return {
        value: item.hr,
        date: item.date
      }
    })
  }, [ctgHistory.length]);

  const accelerationData = useMemo(() => {
    return ctgHistory.map((item) => {
      return {
        value: item.acceleration,
        date: item.date
      }
    })
  }, [ctgHistory.length]);

  return (
    <div className={style.charts__valuesCharts}>
      <ThresholdChartCard title={"STV (мс)"}
                          zones={[
                            {label: "good", ranges: [[3, 1000]], color: "#c3ffac"},
                            {label: "doubtful", ranges: [[2.6, 3]], color: "#ffe7ac"},
                            {label: "dangerous", ranges: [[-1000, 2.6]], color: "#ffc2ac"},
                          ]}
                          data={stvData}
                          padding={[2, 2]}/>
      <ThresholdChartCard title={"БЧСС (уд/мин)"}
                          zones={[
                            {label: "good", ranges: [[110, 150]], color: "#c3ffac"},
                            {label: "doubtful", ranges: [[100, 110], [150, 170]], color: "#ffe7ac"},
                            {label: "dangerous", ranges: [[-1000, 100], [170, 1000]], color: "#ffc2ac"},
                          ]}
                          data={hrData}
                          padding={[20, 30]}/>
      <ThresholdChartCard title={"Акцелерации (шт)"}
                          zones={[
                            {label: "good", ranges: [[5, 1000]], color: "#d9fbd3"},
                            {label: "dangerous", ranges: [[-1000, 5]], color: "#ffc2ac"},
                          ]}
                          data={accelerationData}
                          padding={[2, 2]}/>
    </div>
  );
}

export default CTGThresholdCharts;
