import React, {FC} from 'react';
import * as style from './IndicatorContainer.module.css'

interface IndicatorContainerProps extends React.HTMLAttributes<HTMLParagraphElement> {
  name: string;
  value: number | string;
  label?: string;
  subLabel: string;
  valueClassName?: string;
}

const IndicatorContainer: FC<IndicatorContainerProps> = ({
                                                           name,
                                                           value,
                                                           label,
                                                           subLabel,
                                                           valueClassName,
                                                           ...props
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
      <p {...props} className={[
        style.indicatorContainer__value,
        valueClassName
      ].join(' ')}>{value}</p>
      <span className={style.indicatorContainer__subLabel}>{subLabel}</span>
    </div>
  );
};

export default IndicatorContainer;