import React, {FC, ReactNode} from 'react';
import * as style from './Wrapper.module.css'

/**
 * Родительская обертка для установления отступов по краям
 * @param children - вложенный контент, к которому нужно применить обертку
 * @constructor
 */
const Wrapper: FC<{ children: ReactNode }> = ({children}) => {
  return (
    <div className={style.block}>
      {children}
    </div>
  );
}

export default Wrapper;