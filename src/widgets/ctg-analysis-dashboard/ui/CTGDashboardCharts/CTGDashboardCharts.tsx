import React from "react";
import * as style from "./CTGDashboardCharts.module.css";
import FIGOChart from "@shared/ui/figo-chart";
import {useAppSelector} from "@app/store/store";
import {selectAllCTGHistory, selectAnalysisText} from "@entities/ctg-history/model/selectors";
import CTGThresholdCharts from "@widgets/ctg-analysis-dashboard/ui/CTGDashboardCharts/ui";

/**
 * **CTGDashboardCharts** — компонент для отображения
 * динамики FIGO и ключевых параметров КТГ по всей истории наблюдений.
 *
 * ---
 * ### Основные задачи:
 * - Рисует график FIGO (состояния по FIGO-протоколу) во времени.
 * - Выводит несколько графиков с пороговыми зонами для параметров:
 *   - STV (коротковременная вариабельность),
 *   - базальная ЧСС,
 *   - количество акцелераций.
 * - Дополнительно показывает текстовую интерпретацию тренда.
 *
 * ---
 * ### Используемые данные:
 * Данные берутся из Redux Store через селектор {@link selectAllCTGHistory}.
 * История сортируется по дате, чтобы обеспечить корректное отображение динамики.
 *
 * ---
 * ### Визуальная структура:
 * ```tsx
 * <div className={style.charts}>
 *   <h4>Динамика FIGO по истории КТГ</h4>
 *   <FIGOChart data={ctgHistory}/>
 *   <CTGThresholdCharts ctgHistory={ctgHistory}/>
 *   <div className={style.charts__trend}>
 *     <p><b>Тренд:</b> текстовая интерпретация</p>
 *   </div>
 * </div>
 * ```
 *
 * ---
 * ### Пример использования:
 * ```tsx
 * import CTGDashboardCharts from "@widgets/ctg-analysis-dashboard/ui/CTGDashboardCharts/CTGDashboardCharts";
 *
 * const Dashboard = () => (
 *   <section>
 *     <CTGDashboardCharts />
 *   </section>
 * );
 * ```
 */
const CTGDashboardCharts = () => {
  const ctgHistory = useAppSelector(selectAllCTGHistory);
  const analysisText = useAppSelector(selectAnalysisText);

  return (
    <div className={style.charts}>
      <h4 className={style.charts__headerText}>Динамика FIGO по истории КТГ</h4>
      <div className={style.charts__figo}>
        <FIGOChart data={ctgHistory}/>
      </div>

      <CTGThresholdCharts ctgHistory={ctgHistory}/>

      <div className={style.charts__trand}>
        <p><b>Тренд:</b> {analysisText}</p>
      </div>
    </div>
  );
};

export default CTGDashboardCharts;
