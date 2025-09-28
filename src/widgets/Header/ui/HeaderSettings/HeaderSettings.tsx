import React, {FC} from 'react';
import * as style from './HeaderSettings.module.css'

const HeaderSettings: FC = () => {
  return (
    <header className={style.header}>
      <h2>Настройки</h2>
    </header>
  );
};

export default HeaderSettings;