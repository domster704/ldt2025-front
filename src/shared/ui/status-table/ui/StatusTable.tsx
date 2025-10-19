import React, {FC} from "react";
import ContainerWithLabel from "@shared/ui/container-with-label";
import StatusLabel from "@shared/ui/status-label";
import * as style from "./StatusTable.module.css";
import {IndicatorConfig} from "@shared/types/indicator-zone";

export interface StatusTableRow {
  label: string;
  score: number | null;
  situation: string | null;
  config: IndicatorConfig;
}

interface StatusTableProps {
  title: string;
  rows: StatusTableRow[];
  className?: string;
}

/**
 * Универсальная таблица статусов (например FIGO / Савельева / STV).
 */
const StatusTable: FC<StatusTableProps> = ({title, rows, className}) => {
  return (
    <ContainerWithLabel label={title} className={className}>
      <table className={style.statusTable}>
        <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            <td className={style.rowName}>{row.label}</td>
            <td className={style.rowValue}><b>{row.score ?? "-"}</b></td>
            <td>
              {
                row.situation ?
                  <StatusLabel
                    name={row.situation}
                    score={row.score}
                    config={row.config}
                  />
                  : "Нет данных"
              }
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </ContainerWithLabel>
  );
};

export default StatusTable;
