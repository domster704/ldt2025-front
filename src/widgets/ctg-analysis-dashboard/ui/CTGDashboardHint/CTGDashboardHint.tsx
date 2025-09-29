import React, {FC} from 'react';
import * as style from './CTGDashboardHint.module.css'

import infoImg from '@shared/assets/img/info.svg';

const CTGDashboardHint: FC = () => {
  return (
    <div className={style.tooltip}>
      <img src={infoImg} alt="info"/>
      <div className={style.tooltip__textContainer}>
        <h4>Просмотр и сравнение</h4>
        <p>Выберите две КТГ, чтобы сравнить их</p>
      </div>
    </div>
  );
}

export default CTGDashboardHint;
