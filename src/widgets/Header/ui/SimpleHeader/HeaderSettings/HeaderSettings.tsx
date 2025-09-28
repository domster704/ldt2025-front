import React, {FC} from 'react';
import * as style from '../SimpleHeader.module.css'

const HeaderSettings: FC = () => {
  return (
    <header className={style.header}>
      <h2>Настройки</h2>
    </header>
  );
};

export default HeaderSettings;