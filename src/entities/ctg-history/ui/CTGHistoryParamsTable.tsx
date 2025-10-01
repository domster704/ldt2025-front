import React from "react";
import * as style from "./CTGHistoryParamsTable.module.css";
import {PARAM_GROUPS, PREDICTIONS} from "@entities/ctg-history/model/paramsConfig";

type Mode = "single" | "compare";

interface CTGHistoryParamsTableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  mode: Mode;
  data: any | any[];
}

function formatValue(value: unknown) {
  if (value instanceof Date) return value.toLocaleDateString();
  if (value == null) return "—";
  return String(value);
}

const CTGHistoryParamsTable: React.FC<CTGHistoryParamsTableProps> = ({
                                                                       mode,
                                                                       data,
                                                                       ...props
                                                                     }) => {
  if (mode === "single") {
    const ctg = data;

    return (
      <table {...props} className={[
        style.table,
        props.className || '',
      ].join(' ')}>
        <tbody>
        {PARAM_GROUPS.map((group, gi) => (
          <tr key={gi}>
            {group.map((param, pi) => (
              <React.Fragment key={pi}>
                <td>{param.label}</td>
                <td>{formatValue(ctg[param.key])}</td>
              </React.Fragment>
            ))}
          </tr>
        ))}
        <tr>
          {PREDICTIONS.map((p, i) => (
            <td key={i} className={style.table__predict} colSpan={2}>
              <div>
                <p>{p.label}</p>
                <p>{formatValue(ctg[p.key])}</p>
              </div>
            </td>
          ))}
          <td></td>
          <td></td>
        </tr>
        </tbody>
      </table>
    );
  }

  if (mode === "compare") {
    const [ctg1, ctg2] = data;

    const flatParams = [...PARAM_GROUPS.flat(), ...PREDICTIONS];

    return (
      <table {...props} className={[
        style.table,
        style.table__compare,
        props.className || '',
      ].join(' ')}>
        <thead>
        <tr>
          <th></th>
          <th>
            {ctg1.date?.toLocaleDateString?.() ?? "Исследование 1"}
            <br/>
            38+2 нед
          </th>
          <th>
            {ctg2.date?.toLocaleDateString?.() ?? "Исследование 2"}
            <br/>
            38+2 нед
          </th>
        </tr>
        </thead>
        <tbody>
        {flatParams.map((param, idx) => (
          <tr key={idx}>
            <td>{param.label}</td>
            <td>{formatValue(ctg1[param.key])}</td>
            <td>{formatValue(ctg2[param.key])}</td>
          </tr>
        ))}
        </tbody>
      </table>
    );
  }

  return null;
};

export default CTGHistoryParamsTable;
