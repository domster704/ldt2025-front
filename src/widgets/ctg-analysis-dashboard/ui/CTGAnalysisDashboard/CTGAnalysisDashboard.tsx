import React, {FC, useMemo} from 'react';
import * as style from './CTGAnalysisDashboard.module.css'
import {useCTGHistory} from "@features/ctg-history-selection-provider";
import CTGDashboardHint from "@widgets/ctg-analysis-dashboard/ui/CTGDashboardHint/CTGDashboardHint";
import CTGDashboardParams from "@widgets/ctg-analysis-dashboard/ui/CTGDashboardParams/CTGDashboardParams";
import CTGDashboardCharts from "@widgets/ctg-analysis-dashboard/ui/CTGDashboardCharts/CTGDashboardCharts";
import CTGDashboardCompare from "@widgets/ctg-analysis-dashboard/ui/CTGDashboardCompare/CTGDashboardCompare";

interface CTGAnalysisDashboardProps {
}

/**
 * **CTGAnalysisDashboard** — главный аналитический дашборд для работы с историей КТГ.
 *
 * ---
 * ### Основные задачи:
 * - Управляет отображением различных режимов анализа КТГ:
 *   - **charts** — графики FIGO и тренды параметров (если ничего не выбрано).
 *   - **params** — подробные параметры для одной записи истории.
 *   - **compare** — сравнение двух историй КТГ по таблицам и графикам.
 * - Автоматически переключает режим в зависимости от количества выбранных историй
 *   через {@link useCTGHistory}.
 *
 * ---
 * ### Логика выбора режима:
 * - `0 выбранных` → показываются графики (FIGO + тренды).
 * - `1 выбранная` → подробные параметры выбранного исследования.
 * - `2 выбранные` → сравнение двух исследований.
 * - `>2` → fallback к режиму графиков.
 *
 * ---
 * ### Визуальная структура:
 * ```tsx
 * <div className={style.content}>
 *   <CTGDashboardHint/>           // подсказка пользователю
 *   {режим === charts  && <CTGDashboardCharts/>}
 *   {режим === params  && <CTGDashboardParams/>}
 *   {режим === compare && <CTGDashboardCompare/>}
 * </div>
 * ```
 *
 * ---
 * ### Пример использования:
 * ```tsx
 * import CTGAnalysisDashboard from "@widgets/ctg-analysis-dashboard";
 *
 * const HistoryPage = () => (
 *   <section>
 *     <CTGAnalysisDashboard />
 *   </section>
 * );
 * ```
 */
enum CTGAnalysisDashboardMode {
  charts,
  params,
  compare,
}

const CTGAnalysisDashboard: FC<CTGAnalysisDashboardProps> = ({}) => {
  const {selected} = useCTGHistory();

  const mode: CTGAnalysisDashboardMode = useMemo(() => {
    switch (selected.length) {
      case 0:
        return CTGAnalysisDashboardMode.charts;
      case 1:
        return CTGAnalysisDashboardMode.params;
      case 2:
        return CTGAnalysisDashboardMode.compare;
      default:
        return CTGAnalysisDashboardMode.charts;
    }
  }, [selected]);

  return (
    <div className={style.content}>
      <CTGDashboardHint/>

      {mode === CTGAnalysisDashboardMode.charts && <CTGDashboardCharts/>}
      {mode === CTGAnalysisDashboardMode.params && <CTGDashboardParams ctgHistoryId={selected[0]}/>}
      {mode === CTGAnalysisDashboardMode.compare && <CTGDashboardCompare ids={selected}/>}
    </div>
  );
}

export default CTGAnalysisDashboard;
