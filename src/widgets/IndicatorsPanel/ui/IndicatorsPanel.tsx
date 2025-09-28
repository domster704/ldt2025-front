import React, {FC} from 'react';
import * as style from './IndicatorsPanel.module.css'
import {useAppDispatch, useAppSelector} from "@app/store/store";
import IndicatorContainer from "@shared/ui/IndicatorContainer";

interface IndicatorsPanelProps {

}


const IndicatorsPanel: FC<IndicatorsPanelProps> = ({}) => {
  const global = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();

  return (
    <div className={style.panel}>
      <div className={[
        style.panel__twoColumns,
        style.panel__doubleDataInColumn
      ].join(' ')}>
        <IndicatorContainer name={"БЧСС"}
                            value={130}
                            label={"DECG"}
                            subLabel={"уд./мин"}/>

        <IndicatorContainer name={"Вариабельность"}
                            value={8.2}
                            label={"STV"}
                            subLabel={"мс"}/>
      </div>

      <IndicatorContainer name={"Внутриматочное давление"}
                          value={60}
                          label={"IUP"}
                          subLabel={"мм.рт.ст."}/>

      <IndicatorContainer name={"Маточная активность"}
                          value={60}
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