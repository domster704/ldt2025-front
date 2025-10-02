import React, {FC} from 'react';
import * as style from './IndicatorsPanel.module.css'
import {useAppSelector} from "@app/store/store";
import IndicatorContainer from "@shared/ui/indicator-container";
import {selectLastHR, selectLastSTV, selectLastUC} from "@entities/session-stream";
import {getZone} from "@widgets/indicators-panel/lib/getZone";
import {HR_CONFIG, STV_CONFIG, UC_CONFIG} from "@widgets/indicators-panel/model/configs";
import {selectGoodColor, selectWarningColor} from "@entities/settings/model/selectors";

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
 * **IndicatorsPanel** — панель для отображения физиологических показателей пациента.
 *
 * ---
 * ### Основные задачи:
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
 *
 * ---
 * ### Визуальная структура:
 * ```
 * ┌─────────────── ПАНЕЛЬ ────────────────┐
 * | БЧСС: 140 уд/мин (зелёный)            |
 * | STV: 4.5 мс (красный, вне нормы)      |
 * | IUP: 60 мм.рт.ст.                     |
 * | UC: 22 % (зелёный)                    |
 * | SpO₂: 98 %                            |
 * | ЧСС матери: 110 уд/мин                |
 * | NIBP: 120/80                          |
 * └───────────────────────────────────────┘
 * ```
 *
 * ---
 * ### Пример использования:
 * ```tsx
 * import IndicatorsPanel, {IndicatorsPanelPlacement} from "@widgets/indicators-panel";
 *
 * const StatusPage = () => (
 *   <IndicatorsPanel placement={IndicatorsPanelPlacement.Row} />
 * );
 * ```
 */
const IndicatorsPanel: FC<IndicatorsPanelProps> = ({
                                                     placement = IndicatorsPanelPlacement.Grid
                                                   }) => {
  const goodColor = useAppSelector(selectGoodColor);
  const warningColor = useAppSelector(selectWarningColor);

  const hr = useAppSelector(selectLastHR);
  const uc = useAppSelector(selectLastUC);
  const stv = useAppSelector(selectLastSTV);

  const hrValue = hr?.y ?? null;
  const stvValue = stv ?? null;
  const ucValue = uc?.y ?? null;

  const hrZone = getZone(hrValue, HR_CONFIG);
  const stvZone = getZone(stvValue, STV_CONFIG);
  const ucZone = getZone(ucValue, UC_CONFIG);

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
    </div>
  );
}

export default IndicatorsPanel;
