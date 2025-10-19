import React, {FC, useMemo} from 'react';
import * as style from './HeaderGraph.module.css'

import userIcon from "@shared/assets/img/userWhite.svg";
import {useColorsStatus} from "@app/providers/color-provider";
import {useAppSelector} from "@app/store/store";
import {selectChosenPatient} from "@entities/patient/model/selectors";
import {
  selectLastFIGO,
  selectLastFischer,
  selectLastHypoxiaProbability, selectLastHypoxiaStatus,
  selectLastSavelyeva
} from "@entities/session-stream";
import {CTGStatus} from "@shared/const/ctgColors";
import {ClassificationType} from "@entities/global/model/types";
import {selectClassificationType} from "@entities/global/model/selectors";

/**
 * HeaderGraph — компонент заголовка для экрана с графиками КТГ.
 */
const HeaderGraph: FC = () => {
  const patient = useAppSelector(selectChosenPatient);
  const hypoxiaProbability = useAppSelector(selectLastHypoxiaProbability);
  const hypoxiaStatus = useAppSelector(selectLastHypoxiaStatus);

  const classification = useAppSelector(selectClassificationType);
  const figoStatus = useAppSelector(selectLastFIGO);
  const fischerStatus = useAppSelector(selectLastFischer);
  const savelyevaStatus = useAppSelector(selectLastSavelyeva);

  const {status} = useColorsStatus();

  const statusText = useMemo(() => {
    if (status === CTGStatus.None) {
      return "Нет данных";
    } else if (status === CTGStatus.Normal) {
      return "В норме";
    } else {
      return "Требуется внимание";
    }
  }, [status]);

  const activeClassificationLabel = useMemo(() => {
    switch (classification) {
      case ClassificationType.FIGO:
        return { name: "FIGO", value: figoStatus };
      case ClassificationType.FISCHER:
        return { name: "Фишер", value: fischerStatus };
      case ClassificationType.SAVELYEVA:
        return { name: "Савельева", value: savelyevaStatus };
      default:
        return { name: "FIGO", value: figoStatus };
    }
  }, [classification, figoStatus, fischerStatus, savelyevaStatus]);

  return (
    <header className={style.header}>
      <div className={style.header__main}>
        <div className={style.info}>
          <img src={userIcon} alt={""}/>
          <p>{patient?.fio || 'Не выбран'}</p>
          <p>{patient ? "Срок: 38+2 нед" : ''}</p>
        </div>
        <div className={style.status}>
          <h4>Состояние: {statusText}</h4>
        </div>
      </div>
      <div className={style.header__sub}>
        <div className={style.sub__label}>Общий прогноз</div>
        <p className={style.predictionText}>
          {hypoxiaStatus ?? ""}
        </p>

        {
          (figoStatus || fischerStatus || savelyevaStatus) &&
            <div className={style.figo}>
                <p>{activeClassificationLabel.name}:</p>
                <span className={style.figo__indicator}>{activeClassificationLabel.value}</span>
            </div>
        }
      </div>
    </header>
  );
};

export default HeaderGraph;
