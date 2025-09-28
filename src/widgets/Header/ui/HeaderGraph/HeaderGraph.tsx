import React, {FC, useMemo} from 'react';
import * as style from './HeaderGraph.module.css'
import {useAppDispatch, useAppSelector} from "@app/store/store";

import userIcon from "./assets/user.svg";
import {useColorsStatus} from "@shared/providers/color-provider";
import {ColorHealthStatus} from "@shared/providers/color-provider/model/types";

const HeaderGraph: FC = (props) => {
  const {status} = useColorsStatus();
  const statusText = useMemo(() => {
    if (status === ColorHealthStatus.GOOD) {
      return "В норме";
    } else if (status === ColorHealthStatus.WARNING) {
      return "Требуется внимание";
    }
  }, [status])

  const global = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();

  return (
    <header className={style.header}>
      <div className={style.info}>
        <img src={userIcon} alt={""}/>
        <p>Платонова А.А.</p>
        <p>Срок: 38+2 нед</p>
      </div>
      <div className={style.status}>
        <h4>Состояние: {statusText}</h4>
      </div>
    </header>
  );
}

export default HeaderGraph;