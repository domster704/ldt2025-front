import React, {FC, useMemo} from "react";
import * as style from "./CTGDashboardParams.module.css";
import ContainerWithLabel from "@shared/ui/container-with-label";
import {CTGHistory} from "@entities/ctg-history/model/types";
import {useAppSelector} from "@app/store/store";
import {selectCTGHistoryById} from "@entities/ctg-history/model/selectors";
import {LabelPosition} from "@shared/ui/container-with-label/ui/ContainerWithLabel";
import {Dashboard} from "@widgets/dashboard";
import {StreamPoint} from "@entities/session-stream";

interface CTGDashboardParamsProps {
  ctgHistoryId: number;
}

const CTGDashboardParams: FC<CTGDashboardParamsProps> = ({ctgHistoryId}) => {
  const ctgHistory: CTGHistory = useAppSelector(state => selectCTGHistoryById(state, ctgHistoryId));

  const {fhrData, ucData} = useMemo(() => {
    return {
      fhrData: ctgHistory.graph.bpm.map(p => ({x: p.time_sec, y: p.value})) as StreamPoint[],
      ucData: ctgHistory.graph.uc.map(p => ({x: p.time_sec, y: p.value})) as StreamPoint[],
    };
  }, [ctgHistory]);

  return (
    <div>
      <ContainerWithLabel className={style.params__chartsConainer}
                          labelPosition={LabelPosition.RIGHT}
                          label={ctgHistory.date.toLocaleDateString()}>
        <Dashboard className={style.params__dashboard}
                   fhrData={fhrData}
                   ucData={ucData}
                   slideWindowTime={3 * 60 * 3600}
                   maxPoints={4000}/>
      </ContainerWithLabel>
      <div className={style.params}>
        <table>
          <thead>
          <tr>
            <th>Параметр</th>
            <th>Значение</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Базальная ЧСС</td>
            <td>130</td>
          </tr>
          <tr>
            <td>Акцелерации</td>
            <td>2</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CTGDashboardParams;
