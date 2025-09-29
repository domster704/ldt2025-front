import React, {FC, useMemo} from 'react';
import * as style from './CTGAnalysisDashboard.module.css'
import {useCTGHistory} from "@features/ctg-history-selection-provider";
import CTGDashboardHint from "@widgets/ctg-analysis-dashboard/ui/CTGDashboardHint/CTGDashboardHint";
import CTGDashboardParams from "@widgets/ctg-analysis-dashboard/ui/CTGDashboardParams/CTGDashboardParams";
import CTGDashboardCharts from "@widgets/ctg-analysis-dashboard/ui/CTGDashboardCharts/CTGDashboardCharts";
import CTGDashboardCompare from "@widgets/ctg-analysis-dashboard/ui/CTGDashboardCompare/CTGDashboardCompare";

interface CTGAnalysisDashboardProps {

}

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
      {mode === CTGAnalysisDashboardMode.params && <CTGDashboardParams/>}
      {mode === CTGAnalysisDashboardMode.compare && <CTGDashboardCompare ids={selected}/>}
      {/*{mode === CTGAnalysisDashboardMode.charts && <CTGDashboardDetail id={selected[0]} />}*/}
    </div>
  );
}

export default CTGAnalysisDashboard;
