import React, {FC} from 'react';
import * as style from './IndicatorsPanel.module.css'
import {useAppSelector} from "@app/store/store";
import IndicatorContainer from "@shared/ui/indicator-container";
import {selectLastHR, selectLastSTV, selectLastUC} from "@entities/session-stream";
import {getZone} from "@widgets/indicators-panel/lib/getZone";
import {HR_CONFIG, STV_CONFIG, UC_CONFIG} from "@widgets/indicators-panel/model/configs";
import {selectGoodColor, selectWarningColor} from "@entities/settings/model/selectors";


export enum IndicatorsPanelPlacement {
  Grid = "grid",
  Row = "row"
}

interface IndicatorsPanelProps {
  placement?: IndicatorsPanelPlacement;
}


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

        <IndicatorContainer name={"Вариабельность"}
                            valueClassName={!stvValue && style.panel__noData}
                            value={stvValue || "Нет данных"}
                            label={"STV"}
                            subLabel={"мс"}
                            style={{
                              color:
                                hrZone === "good"
                                  ? goodColor
                                  : hrZone === "bad"
                                    ? warningColor
                                    : "inherit"
                            }}/>
      </div>

      <IndicatorContainer name={"Внутриматочное давление"}
                          value={60}
                          label={"IUP"}
                          subLabel={"мм.рт.ст."}/>

      <IndicatorContainer name={"Маточная активность"}
                          valueClassName={!ucValue && style.panel__noData}
                          value={ucValue || "Нет данных"}
                          label={"TOCO"}
                          subLabel={"%"}
                          style={{
                            color:
                              hrZone === "good"
                                ? goodColor
                                : hrZone === "bad"
                                  ? warningColor
                                  : "inherit"
                          }}/>

      <IndicatorContainer name={"SpO₂"}
                          value={98}
                          subLabel={"%"}/>

      <IndicatorContainer name={"ЧСС матери"}
                          value={110}
                          label={"MECG"}
                          subLabel={"уд./мин"}/>


      <div className={style.panel__twoColumns}>
        <IndicatorContainer name={"Неинвазивное артериальное давление"}
                            value={"120/80"}
                            label={"NIBP"}
                            subLabel={"%"}/>
      </div>
    </div>
  );
}

export default IndicatorsPanel;