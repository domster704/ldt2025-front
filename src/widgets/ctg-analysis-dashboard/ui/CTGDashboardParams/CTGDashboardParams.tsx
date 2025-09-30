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
    <div className={style.paramsContainer}>
      <ContainerWithLabel className={style.params__chartsContainer}
                          labelPosition={LabelPosition.RIGHT}
                          label={ctgHistory.date.toLocaleDateString()}>
        <Dashboard className={style.params__dashboard}
                   fhrData={fhrData}
                   ucData={ucData}
                   slideWindowTime={10 * 60 * 3600}
                   maxPoints={4000}/>
      </ContainerWithLabel>

      <div className={style.params}>
        <table>
          <tbody>
          <tr>
            <td>Базальная ЧСС, уд/мин</td>
            <td>0</td>

            <td>Амплитуда осцилляций, уд/мин</td>
            <td>0</td>

            <td>Частота осцилляций, осц/мин</td>
            <td>0</td>
          </tr>
          <tr>
            <td>ДВВ (LTV) за сеанс, мс</td>
            <td>0</td>

            <td>КВВ (STV) за сеанс, мс</td>
            <td>0</td>

            <td>КВВ (STV) за 10 мин, мс</td>
            <td>0</td>
          </tr>
          <tr>
            <td>Акцелерации &gt;15 уд/мин</td>
            <td>0</td>

            <td>Акцелерации &gt;10 уд/мин</td>
            <td>0</td>

            <td>Децелерации все</td>
            <td>0</td>
          </tr>
          <tr>
            <td>Децелерации S &gt;20 ударов</td>
            <td>0</td>

            <td>Сокращений матки</td>
            <td>0</td>

            <td>Высокая вариабельность, мин</td>
            <td>0</td>
          </tr>
          <tr>
            <td>Шевелений плода, за сеанс</td>
            <td>0</td>

            <td>Низкая вариабельность, мин</td>
            <td>0</td>

            <td>Шевелений плода, в час</td>
            <td>0</td>
          </tr>
          <tr>
            <td>Потеря сигнала (%)</td>
            <td>0</td>

            <td></td>
            <td></td>

            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>

            <td className={style.params__predict}
                colSpan={2}>
              <div>
                <p>КТГ по FIGO</p>
                <p>Нормальная</p>
              </div>
            </td>

            <td className={style.params__predict}
                colSpan={2}>
              <div>
                <p>Прогноз FIGO</p>
                <p>Нормальная</p>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CTGDashboardParams;
