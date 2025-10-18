import React from "react";
import {CTGHistory} from "@entities/ctg-history/model/types";
import {PARAM_GROUPS, PREDICTIONS} from "@entities/ctg-history/model/paramsConfig";
import * as style from "./CTGHistoryParamsTable.module.css";
import {formatHeader, formatValue, getFIGOBg, getValue} from "@entities/ctg-history/lib/utils";

import arrowDownImg from "@shared/assets/img/arrowBottom.svg";
import arrowUpImg from "@shared/assets/img/arrowTop.svg";

interface CompareProps extends React.TableHTMLAttributes<HTMLTableElement> {
  data: [CTGHistory, CTGHistory];
}

const Compare: React.FC<CompareProps> = ({
                                           data,
                                           ...props
                                         }) => {
  const [ctg1, ctg2] = data;
  const flatParams = [...PARAM_GROUPS.flat(), ...PREDICTIONS];

  return (
    <table {...props} className={[
      style.table,
      style.table__compare,
      props.className || ''
    ].join(" ")}>
      <thead>
      <tr>
        <th></th>
        <th>{formatHeader(ctg1)}</th>
        <th>{formatHeader(ctg2)}</th>
      </tr>
      </thead>
      <tbody>
      {
        flatParams.map((param, idx) => {
          const val1 = getValue(ctg1, param.key);
          const val2 = getValue(ctg2, param.key);
          const arrow = getTrendArrow(val1, val2);

          return (
            <tr key={idx}>
              <td>{param.label}</td>

              <td style={{
                backgroundColor: param.key.includes("figo") || param.key.includes("forecast")
                  ? getFIGOBg(getValue(ctg1, param.key))
                  : undefined
              }}>
                {formatValue(getValue(ctg1, param.key))}
              </td>

              <td style={{
                backgroundColor: param.key.includes("figo") || param.key.includes("forecast")
                  ? getFIGOBg(getValue(ctg2, param.key))
                  : undefined
              }}>
                {formatValue(val2)}

                {arrow && (
                  <img className={style.compareArrow}
                       src={arrow === 'up' ? arrowUpImg : arrowDownImg}
                       alt={""}/>
                )}
              </td>

            </tr>
          );
        })
      }
      </tbody>
    </table>
  );
};

function getTrendArrow(a: unknown, b: unknown): "up" | "down" | undefined {
  if (typeof a !== "number" || typeof b !== "number") return undefined;
  if (isNaN(a) || isNaN(b)) return undefined;
  if (b > a) return "up";
  if (b < a) return "down";
  return undefined;
}

export default Compare;