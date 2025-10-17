import React, {FC, useMemo} from "react";
import * as style from "./CTGDashboardParams.module.css";
import ContainerWithLabel from "@shared/ui/container-with-label";
import {CTGHistory} from "@entities/ctg-history/model/types";
import {useAppSelector} from "@app/store/store";
import {selectCTGHistoryById} from "@entities/ctg-history/model/selectors";
import {LabelPosition} from "@shared/ui/container-with-label/ui/ContainerWithLabel";
import {Dashboard} from "@widgets/dashboard";
import {StreamPoint} from "@entities/session-stream";
import {CTGHistoryParamsTable} from "@entities/ctg-history/ui";

interface CTGDashboardParamsProps {
  /** ID записи истории КТГ, которую нужно отобразить */
  ctgHistoryId: number;
}

/**
 * **CTGDashboardParams** — компонент для детального анализа одного исследования КТГ.
 *
 * ---
 * ### Основные задачи:
 * - Загружает исследование КТГ по его `id` из Redux Store (через {@link selectCTGHistoryById}).
 * - Преобразует данные графиков (`bpm` и `uc`) в формат точек (`StreamPoint[]`).
 * - Отображает:
 *   1. Графики (FHR и UC) внутри {@link Dashboard}.
 *   2. Таблицу параметров с деталями исследования ({@link CTGHistoryParamsTable}).
 */
const CTGDashboardParams: FC<CTGDashboardParamsProps> = ({ctgHistoryId}) => {
  const ctgHistory: CTGHistory = useAppSelector(state => selectCTGHistoryById(state, ctgHistoryId));

  const {fhrData, ucData} = useMemo(() => {
    return {
      fhrData: ctgHistory.graph.bpm.map(p => ({
        x: p.time_sec,
        y: p.value
      })) as StreamPoint[],
      ucData: ctgHistory.graph.uc.map(p => ({
        x: p.time_sec,
        y: p.value
      })) as StreamPoint[],
    };
  }, [ctgHistory]);

  return (
    <div className={style.paramsContainer}>
      <ContainerWithLabel className={style.params__chartsContainer}
                          labelPosition={LabelPosition.RIGHT}
                          label={ctgHistory.result?.timestamp.toLocaleDateString() || ''}>
        <Dashboard className={style.params__dashboard}
                   fhrData={fhrData}
                   ucData={ucData}
                   slideWindowTime={10 * 60 * 1000}
                   maxPoints={4000}/>
      </ContainerWithLabel>

      <CTGHistoryParamsTable.Single data={ctgHistory}/>
    </div>
  );
};

export default CTGDashboardParams;
