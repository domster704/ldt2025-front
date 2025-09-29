import React, {FC} from 'react';
import * as style from './ThresholdChartCard.module.css'
import {useAppDispatch, useAppSelector} from "@app/store/store";
import ThresholdChart, {ThresholdChartProps} from "@shared/ui/threshold-chart/ui/ThresholdChart";

interface ThresholdChartCardProps extends ThresholdChartProps {
  title: string;
}

const ThresholdChartCard: FC<ThresholdChartCardProps> = ({
                                                           title,
                                                           ...props
                                                         }) => {
  return (
    <div className={style.thresholdChartCard}>
      <h4>{title}</h4>
      <div className={style.chart}>
        <ThresholdChart {...props}/>
      </div>
    </div>
  );
}

export default ThresholdChartCard;
