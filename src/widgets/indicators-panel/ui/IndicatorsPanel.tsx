import React, {FC} from 'react';
import * as style from './IndicatorsPanel.module.css'
import {useAppSelector} from "@app/store/store";
import IndicatorContainer from "@shared/ui/indicator-container";
import {
  selectLastAccelerationCount,
  selectLastDecelerationCount,
  selectLastHR,
  selectLastSTV,
  selectLastUC
} from "@entities/session-stream";
import {selectGoodColor, selectWarningColor} from "@entities/settings/model/selectors";
import {getZone} from "@shared/lib/utils/getZone";
import {
  ACCELERATION_CONFIG,
  DECELERATION_CONFIG,
  HR_CONFIG,
  STV_CONFIG,
  UC_CONFIG
} from "@shared/lib/configs/range-configs";

export enum IndicatorsPanelPlacement {
  /** Разметка в виде сетки */
  Grid = "grid",
  /** Разметка в одну строку */
  Row = "row"
}

interface IndicatorsPanelProps {
  /** Расположение панели: сетка (по умолчанию) или строка */
  placement?: IndicatorsPanelPlacement;
}

/**
 * IndicatorsPanel — панель для отображения физиологических показателей пациента.
 *
 * Основные задачи:
 * - Получает последние значения параметров из Redux Store:
 *   - ЧСС плода (HR) через {@link selectLastHR}.
 *   - Вариабельность (STV) через {@link selectLastSTV}.
 *   - Маточная активность (UC) через {@link selectLastUC}.
 * - Определяет зоны состояния (`good` / `bad`) через {@link getZone} и конфиги:
 *   - {@link HR_CONFIG},
 *   - {@link STV_CONFIG},
 *   - {@link UC_CONFIG}.
 * - Подсвечивает значения цветами из настроек:
 *   - Хорошее состояние → цвет {@link selectGoodColor}.
 *   - Плохое состояние → цвет {@link selectWarningColor}.
 * - Показывает также дополнительные статичные показатели:
 *   - Внутриматочное давление (IUP),
 *   - SpO₂,
 *   - ЧСС матери (MECG),
 *   - Артериальное давление (NIBP).
 */
const IndicatorsPanel: FC<IndicatorsPanelProps> = ({
                                                     placement = IndicatorsPanelPlacement.Grid
                                                   }) => {
  const goodColor = useAppSelector(selectGoodColor);
  const warningColor = useAppSelector(selectWarningColor);

  const hr = useAppSelector(selectLastHR);
  const uc = useAppSelector(selectLastUC);
  const stv = useAppSelector(selectLastSTV);
  const accelerationCount = useAppSelector(selectLastAccelerationCount);
  const decelerationCount = useAppSelector(selectLastDecelerationCount);

  const hrValue = hr?.y ?? null;
  const stvValue = stv ?? null;
  const ucValue = uc?.y ?? null;

  const hrZone = getZone(hrValue, HR_CONFIG);
  const stvZone = getZone(stvValue, STV_CONFIG);
  const ucZone = getZone(ucValue, UC_CONFIG);
  const accelerationZone = getZone(accelerationCount, ACCELERATION_CONFIG);
  const decelerationZone = getZone(decelerationCount, DECELERATION_CONFIG);


  return (
    <div className={[
      style.panel,
      style[placement]
    ].join(' ')}>
      <div className={[
        style.panel__twoColumns,
        style.panel__doubleDataInColumn
      ].join(' ')}>
        {/* Базальная ЧСС */}
        <IndicatorContainer name={"БЧСС"}
                            valueClassName={!hrValue && style.panel__noData}
                            value={hrValue || "Нет данных"}
                            label={"DECG"}
                            subLabel={"уд./мин"}
                            style={{
                              color:
                                hrZone === "good"
                                  ? goodColor
                                  : hrZone === "bad"
                                    ? warningColor
                                    : "inherit"
                            }}/>

        {/* Вариабельность */}
        <IndicatorContainer name={"Вариабельность"}
                            valueClassName={!stvValue && style.panel__noData}
                            value={stvValue || "Нет данных"}
                            label={"STV"}
                            subLabel={"мс"}
                            style={{
                              color:
                                stvZone === "good"
                                  ? goodColor
                                  : stvZone === "bad"
                                    ? warningColor
                                    : "inherit"
                            }}/>
      </div>

      {/* Внутриматочное давление */}
      <IndicatorContainer name={"Внутриматочное давление"}
                          value={60}
                          label={"IUP"}
                          subLabel={"мм.рт.ст."}
                          style={{color: goodColor}}/>

      {/* Маточная активность */}
      <IndicatorContainer name={"Маточная активность"}
                          valueClassName={!ucValue && style.panel__noData}
                          value={ucValue || "Нет данных"}
                          label={"TOCO"}
                          subLabel={"%"}
                          style={{
                            color:
                              ucZone === "good"
                                ? goodColor
                                : ucZone === "bad"
                                  ? warningColor
                                  : "inherit"
                          }}/>

      {/* SpO₂ */}
      <IndicatorContainer name={"SpO₂"}
                          value={98}
                          subLabel={"%"}
                          style={{color: goodColor}}/>

      {/* ЧСС матери */}
      <IndicatorContainer name={"ЧСС матери"}
                          value={110}
                          label={"MECG"}
                          subLabel={"уд./мин"}
                          style={{color: goodColor}}/>

      <div className={style.panel__twoColumns}>
        <IndicatorContainer name={"Неинвазивное артериальное давление"}
                            value={"120/80"}
                            label={"NIBP"}
                            subLabel={"%"}
                            style={{color: goodColor}}/>
      </div>
      <IndicatorContainer name={"Акцелерации"}
                          valueClassName={!accelerationCount && style.panel__noData}
                          value={accelerationCount || "Нет данных"}
                          subLabel={"шт"}
                          style={{
                            color:
                              accelerationZone === "good"
                                ? goodColor
                                : accelerationZone === "bad"
                                  ? warningColor
                                  : "inherit"
                          }}/>

      <IndicatorContainer name={"Децелерации "}
                          valueClassName={!decelerationCount && style.panel__noData}
                          value={decelerationCount || "Нет данных"}
                          subLabel={"шт"}
                          style={{
                            color:
                              decelerationZone === "good"
                                ? goodColor
                                : decelerationZone === "bad"
                                  ? warningColor
                                  : "inherit"
                          }}/>
    </div>
  );
}

export default IndicatorsPanel;
