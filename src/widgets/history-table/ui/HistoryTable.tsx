import React, {FC} from "react";
import * as style from "./HistoryTable.module.css";
import {mockHistory} from "../lib/mockData";
import {statusMap} from "../lib/statusMap";
import {colors} from "@shared/providers/color-provider/model/types";

import arrowRightImg from "@shared/assets/img/arrowRight.svg";

const HistoryTable: FC = () => {
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
        {mockHistory.map(row => {
          const figoStatus = statusMap[row.figo];
          const forecastStatus = statusMap[row.forecast];

          return (
            <tr key={row.id}>
              <td>{row.date}</td>
              <td>{row.gestation}</td>
              <td>{row.hr}</td>
              <td>{row.uc}</td>
              <td>
                <span className={style.status}
                      style={{backgroundColor: colors[figoStatus]?.hex}}>
                  {row.figo}
                </span>
              </td>
              <td>
                <span className={style.status}
                      style={{backgroundColor: colors[forecastStatus]?.hex}}>
                  {row.forecast}
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
