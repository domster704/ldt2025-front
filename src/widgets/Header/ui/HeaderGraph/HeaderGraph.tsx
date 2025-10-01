import React, {FC, useMemo} from 'react';
import * as style from './HeaderGraph.module.css'

import userIcon from "@shared/assets/img/userWhite.svg";
import {useColorsStatus} from "@app/providers/color-provider";
import {useAppSelector} from "@app/store/store";
import {selectChosenPatient} from "@entities/patient/model/selectors";
import {selectLastFIGO, selectLastHypoxiaProbability} from "@entities/session-stream";
import {CTGStatus} from "@shared/const/ctgColors";

const HeaderGraph: FC = () => {
  const patient = useAppSelector(selectChosenPatient);
  const hypoxiaProbability = useAppSelector(selectLastHypoxiaProbability);
  const figoStatus = useAppSelector(selectLastFIGO);

  const {status} = useColorsStatus();

  const statusText = useMemo(() => {
    if (status === CTGStatus.Normal) {
      return "В норме";
    } else {
      return "Требуется внимание";
    }
  }, [status]);

  if (!patient) {
    return (
      <header className={style.header}>
      </header>
    );
  }

  return (
    <header className={style.header}>
      <div className={style.header__main}>
        <div className={style.info}>
          <img src={userIcon} alt={""}/>
          <p>{patient.name}</p>
          <p>Срок: 38+2 нед</p>
        </div>
        <div className={style.status}>
          <h4>Состояние: {statusText}</h4>
        </div>
      </div>
      <div className={style.header__sub}>
        <div className={style.sub__label}>Общий прогноз</div>
        <p className={style.predictionText}>
          {
            hypoxiaProbability &&
            "Вероятность гипоксии в данный момент " + hypoxiaProbability.toFixed(2) + "%"
          }
        </p>

        <div className={style.figo}>
          <p>FIGO:</p>
          <span className={style.figo__indicator}>{figoStatus}</span>
        </div>
      </div>
    </header>
  );
};

export default HeaderGraph;