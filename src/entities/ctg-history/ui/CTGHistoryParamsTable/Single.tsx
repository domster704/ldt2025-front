import React from "react";
import {CTGHistory} from "@entities/ctg-history/model/types";
import * as style from "./CTGHistoryParamsTable.module.css";
import {PARAM_GROUPS, PREDICTIONS} from "@entities/ctg-history/model/paramsConfig";
import {formatValue, getFIGOBg, getValue} from "@entities/ctg-history/lib/utils";
import {chunk} from "@shared/lib/utils/chunk";

interface SingleProps extends React.TableHTMLAttributes<HTMLTableElement> {
  data: CTGHistory;
}

const Single: React.FC<SingleProps> = ({
                                         data,
                                         ...props
                                       }) => (
  <table {...props} className={[
    style.table,
    props.className || ''
  ].join(' ')}>
    <tbody>
    {PARAM_GROUPS.map((group, gi) => (
      <tr key={gi}>
        {group.map((param, pi) => (
          <React.Fragment key={pi}>
            <td>{param.label}</td>
            <td style={{
              backgroundColor: param.key.includes("figo") || param.key.includes("forecast")
                ? getFIGOBg(getValue(data, param.key))
                : undefined
            }}>
              {formatValue(getValue(data, param.key))}
            </td>
          </React.Fragment>
        ))}
      </tr>
    ))}
    {chunk(PREDICTIONS, 2).map((pair, ri) => (
      <tr key={`pred-${ri}`}>
        {pair.map((p, i) => (
          <td key={i}
              className={style.table__predict}
              colSpan={2}
              style={{
                backgroundColor: getFIGOBg(getValue(data, p.key)),
              }}>
            <div>
              <p>{p.label}</p>
              <p>{formatValue(getValue(data, p.key))}</p>
            </div>
          </td>
        ))}
      </tr>
    ))}
    </tbody>
  </table>
);

export default Single;