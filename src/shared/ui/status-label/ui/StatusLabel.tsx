import React, {FC} from 'react';
import * as style from './StatusLabel.module.css'
import {IndicatorConfig} from "@shared/types/indicator-zone";
import {getZone} from "@shared/lib/utils/getZone";

interface StatusLabelProps {
  /** Название показателя — например, FIGO, Савельева, Фишер */
  name: string;

  /** Текущее значение (балл) */
  score: number | null;

  /** Конфигурация зон нормы/патологии */
  config: IndicatorConfig;
}

const StatusLabel: FC<StatusLabelProps> = ({name, score, config}) => {
  const zone = getZone(score, config);

  return (
    <div className={[
      style.statusLabel,
      style[zone]
    ].join(' ')}>
      {name}
    </div>
  );
}

export default StatusLabel;
