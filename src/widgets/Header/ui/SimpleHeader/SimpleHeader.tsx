import React, {FC} from 'react';
import * as style from './SimpleHeader.module.css'

interface SimpleHeaderProps {
  headerText: string;
}

const SimpleHeader: FC<SimpleHeaderProps> = ({headerText}) => {
  return (
    <header className={style.header}>
      <h2>{headerText}</h2>
    </header>
  );
};

export default SimpleHeader;