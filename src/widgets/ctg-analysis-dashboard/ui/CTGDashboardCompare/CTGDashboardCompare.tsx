import React, {useMemo, useState} from "react";
import * as style from "./CTGDashboardCompare.module.css";
import {useAppSelector} from "@app/store/store";
import {selectAllCTGHistory} from "@entities/ctg-history/model/selectors";
import {CTGHistory} from "@entities/ctg-history/model/types";
import CTGHistoryParamsTable from "@entities/ctg-history/ui/CTGHistoryParamsTable";
import {Dashboard, DashboardInContainer} from "@widgets/dashboard";
import {StreamPoint} from "@entities/session-stream";

import loupeIcon from "@shared/assets/img/loupe.svg";
import Modal from "@shared/ui/modal";

interface CTGDashboardCompareProps {
  ids: number[];
}

const PARAMS: { key: keyof CTGHistory; label: string }[] = [
  {key: "hr", label: "Базальная ЧСС, уд/мин"},
  {key: "uc", label: "Маточные сокращения, усл.ед."},
  {key: "figo", label: "FIGO"},
  {key: "forecast", label: "Прогноз FIGO"},
  {key: "gestation", label: "Срок"},
];

function formatValue(value: unknown): string {
  if (value instanceof Date) {
    return value.toLocaleDateString();
  }
  return String(value);
}

const CTGDashboardCompare: React.FC<CTGDashboardCompareProps> = ({ids}) => {
  const history = useAppSelector(selectAllCTGHistory);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ctg1 = history.find((h) => h.id === ids[0]);
  const ctg2 = history.find((h) => h.id === ids[1]);

  if (!ctg1 || !ctg2) {
    return <div className={style.compare}>Не удалось загрузить данные для сравнения</div>;
  }

  const {fhrData1, ucData1} = useMemo(() => {
    return {
      fhrData1: ctg1.graph.bpm.map(p => ({x: p.time_sec, y: p.value})) as StreamPoint[],
      ucData1: ctg1.graph.uc.map(p => ({x: p.time_sec, y: p.value})) as StreamPoint[],
    };
  }, [ctg1]);

  const {fhrData2, ucData2} = useMemo(() => {
    return {
      fhrData2: ctg2.graph.bpm.map(p => ({x: p.time_sec, y: p.value})) as StreamPoint[],
      ucData2: ctg2.graph.uc.map(p => ({x: p.time_sec, y: p.value})) as StreamPoint[],
    };
  }, [ctg2]);

  const handleOpenDashboards = () => {
    setIsModalOpen(true);
  }

  return (
    <div className={style.compare}>
      <CTGHistoryParamsTable className={style.compare__paramsTable} mode={"compare"} data={[
        ctg1,
        ctg2,
      ]}/>

      <div className={style.compare__dashboards}>
        <div className={style.dashboards__overlay}>
          <div className={style.dashboards__overlayContent} onClick={() => handleOpenDashboards()}>
            <img src={loupeIcon} alt={""}/>
            <p>Открыть</p>
          </div>
        </div>

        <DashboardInContainer label={ctg1.date.toLocaleDateString()}
                              fhrData={fhrData1}
                              ucData={ucData1}/>
        <DashboardInContainer label={ctg2.date.toLocaleDateString()}
                              fhrData={fhrData2}
                              ucData={ucData2}/>
      </div>

      <Modal className={style.modalDashboards}
             isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className={[
          style.modalDashboards__content,
          'modalDashboards__content_'
        ].join(' ')}>
          <DashboardInContainer className={style.modal__dashboardItem}
                                label={ctg1.date.toLocaleDateString()}
                                fhrData={fhrData1}
                                ucData={ucData1}/>
          <DashboardInContainer className={style.modal__dashboardItem}
                                label={ctg2.date.toLocaleDateString()}
                                fhrData={fhrData2}
                                ucData={ucData2}/>
        </div>
      </Modal>
    </div>
  );
};

export default CTGDashboardCompare;
