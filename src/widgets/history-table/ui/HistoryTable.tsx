import React, {FC} from "react";
import * as style from "./HistoryTable.module.css";

import arrowRightImg from "@shared/assets/img/arrowRight.svg";
import {historyColors} from "@widgets/history-table/model/types";
import {useAppSelector} from "@app/store/store";
import {selectAllCTGHistory} from "@entities/ctg-history/model/selectors";
import {CTGHistory} from "@entities/ctg-history/model/types";

const HistoryTable: FC = () => {
  const ctgHistory = useAppSelector(selectAllCTGHistory);

  return (
    <div className={style.tableWrapper}>
      <table className={style.table}>
        <thead>
        <tr>
          <th>Дата</th>
          <th>Срок</th>
          <th>ЧСС</th>
          <th>UC</th>
          <th>FIGO</th>
          <th>Прогноз FIGO</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {ctgHistory.map((ctgHistoryItem: CTGHistory) => {
          const figoColor = historyColors[ctgHistoryItem.figo];
          const forecastColor = historyColors[ctgHistoryItem.forecast];

          return (
            <tr key={ctgHistoryItem.id}>
              <td>{ctgHistoryItem.date.getUTCDate()}</td>
              <td>{ctgHistoryItem.gestation}</td>
              <td>{ctgHistoryItem.hr}</td>
              <td>{ctgHistoryItem.uc}</td>
              <td>
                <span className={style.status}
                      style={{backgroundColor: figoColor}}>
                  {ctgHistoryItem.figo}
                </span>
              </td>
              <td>
                <span className={style.status}
                      style={{backgroundColor: forecastColor}}>
                  {ctgHistoryItem.forecast}
                </span>
              </td>
              <td>
                <button>
                  <img src={arrowRightImg} alt=""/>
                </button>
              </td>
            </tr>
          );
        })}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
