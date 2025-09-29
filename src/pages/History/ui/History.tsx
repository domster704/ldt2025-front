import React, {FC} from 'react';
import * as style from './History.module.css'
import PageWrapper from "@shared/ui/page-wrapper";
import HistoryTable from "@widgets/history-table";
import CTGHistorySelectionProvider from "@features/ctg-history-selection-provider";
import CTGAnalysisDashboard from "@widgets/ctg-analysis-dashboard";
import {SimpleHeader} from "@widgets/header";

interface HistoryProps {

}

const History: FC<HistoryProps> = ({}) => {
  return (
    <PageWrapper>
      <SimpleHeader headerText={"История КТГ"}/>
      <CTGHistorySelectionProvider>
        <section className={style.content}>
          <HistoryTable/>
          <CTGAnalysisDashboard/>
        </section>
      </CTGHistorySelectionProvider>
    </PageWrapper>
  );
}

export default History;