import React, {FC} from 'react';
import * as style from './IndicatorsPanel.module.css'
import {useAppSelector} from "@app/store/store";
import IndicatorContainer from "@shared/ui/indicator-container";
import {selectLastHR, selectLastSTV, selectLastUC} from "@entities/session-stream";


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
  const hr = useAppSelector(selectLastHR);
  const uc = useAppSelector(selectLastUC);
  const stv = useAppSelector(selectLastSTV);

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
                            valueClassName={!hr?.y && style.panel__noData}
                            value={hr?.y || "Нет данных"}
                            label={"DECG"}
                            subLabel={"уд./мин"}/>

        <IndicatorContainer name={"Вариабельность"}
                            valueClassName={!stv && style.panel__noData}
                            value={stv || "Нет данных"}
                            label={"STV"}
                            subLabel={"мс"}/>
      </div>

      <IndicatorContainer name={"Внутриматочное давление"}
                          value={60}
                          label={"IUP"}
                          subLabel={"мм.рт.ст."}/>

      <IndicatorContainer name={"Маточная активность"}
                          valueClassName={!hr?.y && style.panel__noData}
                          value={uc?.y || "Нет данных"}
                          label={"TOCO"}
                          subLabel={"%"}/>

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