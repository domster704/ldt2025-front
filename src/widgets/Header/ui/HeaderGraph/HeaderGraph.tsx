import React, {FC, useMemo} from 'react';
import * as style from './HeaderGraph.module.css'

import userIcon from "@shared/assets/img/userWhite.svg";
import {useColorsStatus} from "@app/providers/color-provider";
import {ColorHealthStatus} from "@app/providers/color-provider/model/types";
import {useAppSelector} from "@app/store/store";
import {selectChosenPatient} from "@entities/patient/model/selectors";

const HeaderGraph: FC = () => {
  const patient = useAppSelector(selectChosenPatient);
  const {status} = useColorsStatus();

  const statusText = useMemo(() => {
    if (status === ColorHealthStatus.Good) {
      return "В норме";
    } else if (status === ColorHealthStatus.Warning) {
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
        <p className={style.predictionText}>Подозрение на брадикардию (БЧСС = 95 уд/мин, -32 уд/мин). Учащение децераций (+3 за 10 мин)</p>

        <div className={style.figo}>
          <p>FIGO:</p>
          <span className={style.figo__indicator}>Сомнительная</span>
        </div>
      </div>
    </header>
  );
};

export default HeaderGraph;