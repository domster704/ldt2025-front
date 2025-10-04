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
 *
 * ---
 * ### Визуальная структура:
 * ```
 * +--------------------------------------------------+
 * | [userIcon] ФИО пациента      Состояние: В норме  |
 * | Срок: 38+2 нед                                 |
 * +--------------------------------------------------+
 * | Общий прогноз                                   |
 * | Вероятность гипоксии: 15.23%                    |
 * | FIGO: [Патологическая]                          |
 * +--------------------------------------------------+
 * ```
 *
 * ---
 * ### Использование:
 * @example
 * ```tsx
 * import HeaderGraph from "@widgets/header/ui/HeaderGraph";
 *
 * const StatusPage = () => (
 *   <div>
 *     <HeaderGraph />
 *     {/* графики, индикаторы и т.д. /*}
 *   </div>
 * );
 * ```
 */
const HeaderGraph: FC = () => {
  const patient = useAppSelector(selectChosenPatient);
  const hypoxiaProbability = useAppSelector(selectLastHypoxiaProbability);
  const figoStatus = useAppSelector(selectLastFIGO);

  const {status} = useColorsStatus();

  // Определяем текстовое описание статуса
  const statusText = useMemo(() => {
    if (status === CTGStatus.Normal) {
      return "В норме";
    } else {
      return "Требуется внимание";
    }
  }, [status]);

  // Если пациент не выбран — пустой header
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
          <p>{patient.fio}</p>
          <p>Срок: 38+2 нед</p>
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

        <div className={style.figo}>
          <p>FIGO:</p>
          <span className={style.figo__indicator}>{figoStatus}</span>
        </div>
      </div>
    </header>
  );
};

export default HeaderGraph;
