import React, {FC} from 'react';
import * as style from './History.module.css'
import PageWrapper from "@shared/ui/page-wrapper";
import {HeaderHistory} from "@widgets/header";
import HistoryTable from "@widgets/history-table";

interface HistoryProps {

}

const History: FC<HistoryProps> = ({}) => {
  return (
    <PageWrapper>
      <HeaderHistory/>
      <section className={style.content}>
        <HistoryTable/>
      </section>
    </PageWrapper>
  );
}

export default History;