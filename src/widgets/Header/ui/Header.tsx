import React, {FC} from 'react';
import * as style from './Header.module.css'
import {useAppDispatch, useAppSelector} from "@app/store/store";

const Header: FC = (props) => {
  const global = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();

  return (
    <header className={style.header}>
      header
    </header>
  );
}

export default Header;