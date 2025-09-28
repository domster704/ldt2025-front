import React, {FC} from 'react';
import * as style from './History.module.css'
import PageWrapper from "@shared/ui/page-wrapper";
import {HeaderHistory} from "@widgets/header";

interface HistoryProps {

}

const History: FC<HistoryProps> = ({}) => {
  return (
    <PageWrapper>
      <HeaderHistory/>
      <div className={style.content}>
        content
      </div>
    </PageWrapper>
  );
}

export default History;