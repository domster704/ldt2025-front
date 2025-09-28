import React, {FC} from 'react';
import * as style from '../SimpleHeader.module.css'

const HeaderHistory: FC = () => {
  return (
    <header className={style.header}>
      <h2>История КТГ</h2>
    </header>
  );
};

export default HeaderHistory;