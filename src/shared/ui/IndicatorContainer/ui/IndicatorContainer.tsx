import React, {FC} from 'react';
import * as style from './IndicatorContainer.module.css'

interface IndicatorContainerProps {
  name: string,
  value: number | string
  label?: string
  subLabel: string
}

const IndicatorContainer: FC<IndicatorContainerProps> = ({
                                                           name,
                                                           value,
                                                           label,
                                                           subLabel
                                                         }) => {
  return (
    <div className={style.indicatorContainer}>
      <div className={style.indicatorContainer__header}>
        <p className={style.indicatorContainer__indicatorName}>{name}</p>
        {
          label &&
            <p className={style.indicatorContainer__indicatorLabel}>{label}</p>
        }
      </div>
      <p className={style.indicatorContainer__value}>{value}</p>
      <span className={style.indicatorContainer__subLabel}>{subLabel}</span>
    </div>
  );
};

export default IndicatorContainer;