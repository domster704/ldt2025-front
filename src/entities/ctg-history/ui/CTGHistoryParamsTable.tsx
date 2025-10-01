import React from "react";
import * as style from "./CTGHistoryParamsTable.module.css";
import {PARAM_GROUPS, PREDICTIONS} from "@entities/ctg-history/model/paramsConfig";
import {ctgColors, CTGStatus} from "@shared/const/ctgColors";
import {CTGHistory} from "@entities/ctg-history/model/types";

type Mode = "single" | "compare";

interface CTGHistoryParamsTableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  mode: Mode;
  data: CTGHistory | CTGHistory[];
}

function formatValue(value: unknown) {
  if (value instanceof Date) return value.toLocaleDateString();
  if (value == null) return "—";
  return String(value);
}

function getValue(ctg: CTGHistory, key: string) {
  return (ctg as any)[key];
}

function getFIGOBg(value: CTGStatus): string | undefined {
  if (!value) {
    return;
  }
  return ctgColors[value];
}

const CTGHistoryParamsTable: React.FC<CTGHistoryParamsTableProps> = ({
                                                                       mode,
                                                                       data,
                                                                       ...props
                                                                     }) => {
  if (mode === "single") {
    const ctg = data as CTGHistory;

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
                <td style={{
                  backgroundColor: param.key.includes("figo") || param.key.includes("forecast")
                    ? getFIGOBg(getValue(ctg, param.key))
                    : undefined
                }}>
                  {formatValue(formatValue(getValue(ctg, param.key)))}
                </td>
              </React.Fragment>
            ))}
          </tr>
        ))}
        <tr>
          {PREDICTIONS.map((p, i) => (
            <td key={i} className={style.table__predict} colSpan={2}
                style={{
                  backgroundColor: getFIGOBg(getValue(ctg, p.key))
                }}>
              <div>
                <p>{p.label}</p>
                <p>{formatValue(formatValue(getValue(ctg, p.key)))}</p>
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
    const [ctg1, ctg2] = data as CTGHistory[];

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
            {ctg1.gestation ?? ""}
          </th>
          <th>
            {ctg2.date?.toLocaleDateString?.() ?? "Исследование 2"}
            <br/>
            {ctg2.gestation ?? ""}
          </th>
        </tr>
        </thead>
        <tbody>
        {flatParams.map((param, idx) => (
          <tr key={idx}>
            <td>{param.label}</td>
            <td style={{
              backgroundColor: param.key.includes("figo") || param.key.includes("forecast")
                ? getFIGOBg(getValue(ctg1, param.key))
                : undefined
            }}>
              {formatValue(formatValue(getValue(ctg1, param.key)))}
            </td>
            <td style={{
              backgroundColor: param.key.includes("figo") || param.key.includes("forecast")
                ? getFIGOBg(getValue(ctg2, param.key))
                : undefined
            }}>
              {formatValue(formatValue(getValue(ctg2, param.key)))}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    );
  }

  return null;
};

export default CTGHistoryParamsTable;
