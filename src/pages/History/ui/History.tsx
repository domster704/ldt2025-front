import React, {FC} from 'react';
import * as style from './History.module.css'
import PageWrapper from "@shared/ui/page-wrapper";
import {HeaderHistory} from "@widgets/header";
import HistoryTable from "@widgets/history-table";
import CTGHistorySelectionProvider from "@features/ctg-history-selection-provider";

interface HistoryProps {

}

const History: FC<HistoryProps> = ({}) => {
  return (
    <PageWrapper>
      <HeaderHistory/>
      <CTGHistorySelectionProvider>
        <section className={style.content}>
          <HistoryTable/>
          <div></div>
        </section>
      </CTGHistorySelectionProvider>
    </PageWrapper>
  );
}

export default History;