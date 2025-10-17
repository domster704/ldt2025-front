import React from "react";
import {CTGHistory} from "@entities/ctg-history/model/types";
import {PARAM_GROUPS, PREDICTIONS} from "@entities/ctg-history/model/paramsConfig";
import * as style from "@entities/ctg-history/ui/CTGHistoryParamsTable/CTGHistoryParamsTable.module.css";
import {formatHeader, formatValue, getFIGOBg, getValue} from "@entities/ctg-history/lib/utils";

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
      {flatParams.map((param, idx) => (
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
            {formatValue(getValue(ctg2, param.key))}
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  );
};

export default Compare;