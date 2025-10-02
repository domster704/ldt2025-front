import React, {FC, useMemo} from 'react';
import * as style from './CTGThresholdCharts.module.css'
import ThresholdChartCard from "@widgets/threshold-chart-card";
import {CTGHistory} from "@entities/ctg-history/model/types";

interface CTGThresholdChartsProps {
  /** История КТГ для отображения динамики параметров */
  ctgHistory: CTGHistory[]
}

/**
 * **CTGThresholdCharts** — компонент для отображения
 * трёх графиков параметров КТГ с пороговыми зонами:
 *
 * - **STV (Short-Term Variability, мс)** — кратковременная вариабельность.
 * - **Базальная ЧСС (уд/мин)** — частота сердечных сокращений плода.
 * - **Количество акцелераций (шт)**.
 *
 * ---
 * ### Основные задачи:
 * - Преобразует массив `ctgHistory` в три отдельных датасета:
 *   - `stvData` — динамика STV,
 *   - `hrData` — динамика базальной ЧСС,
 *   - `accelerationData` — динамика количества акцелераций.
 * - Передаёт данные в {@link ThresholdChartCard}, где
 *   визуализируются линии с подсветкой зон «норма», «сомнительно», «опасно».
 *
 * ---
 * ### Цветовые зоны (пример для STV):
 * - `#c3ffac` — зелёная зона (норма).
 * - `#ffe7ac` — жёлтая зона (сомнительное значение).
 * - `#ffc2ac` — красная зона (опасное значение).
 *
 * ---
 * ### Пример использования:
 * ```tsx
 * import {useAppSelector} from "@app/store/store";
 * import {selectAllCTGHistory} from "@entities/ctg-history/model/selectors";
 *
 * const AnalysisSection = () => {
 *   const history = useAppSelector(selectAllCTGHistory);
 *   return <CTGThresholdCharts ctgHistory={history} />;
 * };
 * ```
 */
const CTGThresholdCharts: FC<CTGThresholdChartsProps> = ({ctgHistory}) => {
  // подготовка данных для графика STV
  const stvData = useMemo(() => {
    return ctgHistory.map((item) => {
      return {
        value: item.stv,
        date: item.date
      }
    })
  }, [ctgHistory]);

  // подготовка данных для графика ЧСС
  const hrData = useMemo(() => {
    return ctgHistory.map((item) => {
      return {
        value: item.hr,
        date: item.date
      };
    });
  }, [ctgHistory]);

  // подготовка данных для графика акцелераций
  const accelerationData = useMemo(() => {
    return ctgHistory.map((item) => {
      return {
        value: item.acceleration,
        date: item.date
      };
    });
  }, [ctgHistory]);

  return (
    <div className={style.charts__valuesCharts}>
      <ThresholdChartCard title={"STV (мс)"}
                          zones={[
                            {label: "good", ranges: [[3, 1000]], color: "#c3ffac"},
                            {label: "doubtful", ranges: [[2.6, 3]], color: "#ffe7ac"},
                            {label: "dangerous", ranges: [[-1000, 2.6]], color: "#ffc2ac"},
                          ]}
                          data={stvData}
                          padding={[2, 2]}/>
      <ThresholdChartCard title={"БЧСС (уд/мин)"}
                          zones={[
                            {label: "good", ranges: [[110, 150]], color: "#c3ffac"},
                            {label: "doubtful", ranges: [[100, 110], [150, 170]], color: "#ffe7ac"},
                            {label: "dangerous", ranges: [[-1000, 100], [170, 1000]], color: "#ffc2ac"},
                          ]}
                          data={hrData}
                          padding={[20, 30]}/>
      <ThresholdChartCard title={"Акцелерации (шт)"}
                          zones={[
                            {label: "good", ranges: [[5, 1000]], color: "#d9fbd3"},
                            {label: "dangerous", ranges: [[-1000, 5]], color: "#ffc2ac"},
                          ]}
                          data={accelerationData}
                          padding={[2, 2]}/>
    </div>
  );
}

export default CTGThresholdCharts;
