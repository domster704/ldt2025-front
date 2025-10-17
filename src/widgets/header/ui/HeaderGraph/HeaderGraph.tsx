import React, {FC, useMemo} from 'react';
import * as style from './HeaderGraph.module.css'

import userIcon from "@shared/assets/img/userWhite.svg";
import {useColorsStatus} from "@app/providers/color-provider";
import {useAppSelector} from "@app/store/store";
import {selectChosenPatient} from "@entities/patient/model/selectors";
import {selectLastFIGO, selectLastHypoxiaProbability} from "@entities/session-stream";
import {CTGStatus} from "@shared/const/ctgColors";

/**
 * **HeaderGraph** — компонент заголовка для экрана с графиками КТГ.
 *
 * ---
 * ### Основные задачи:
 * - Отображает информацию о выбранном пациенте (ФИО, срок беременности).
 * - Показывает текущее состояние по статусу КТГ:
 *   - `"В норме"`, если статус равен {@link CTGStatus.Normal}.
 *   - `"Требуется внимание"` во всех остальных случаях.
 * - Выводит прогноз вероятности гипоксии (если данные доступны).
 * - Показывает текущее значение FIGO.
 *
 * ---
 * ### Источники данных:
 * - {@link selectChosenPatient} — выбранный пациент из Redux Store.
 * - {@link useColorsStatus} — статус цвета, отражающий текущее состояние.
 * - {@link selectLastHypoxiaProbability} — вероятность гипоксии по последнему измерению.
 * - {@link selectLastFIGO} — последнее значение FIGO.
 */
const HeaderGraph: FC = () => {
  const patient = useAppSelector(selectChosenPatient);
  const hypoxiaProbability = useAppSelector(selectLastHypoxiaProbability);
  const figoStatus = useAppSelector(selectLastFIGO);

  const {status} = useColorsStatus();
  console.log(status)

  const statusText = useMemo(() => {
    if (status === CTGStatus.None) {
      return "Нет данных";
    } else if (status === CTGStatus.Normal) {
      return "В норме";
    } else {
      return "Требуется внимание";
    }
  }, [status]);

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
          {hypoxiaProbability &&
            "Вероятность гипоксии в данный момент " + (hypoxiaProbability * 100).toFixed(1) + "%"}
        </p>

        {
          figoStatus &&
            <div className={style.figo}>
                <p>FIGO:</p>
                <span className={style.figo__indicator}>{figoStatus}</span>
            </div>
        }
      </div>
    </header>
  );
};

export default HeaderGraph;
