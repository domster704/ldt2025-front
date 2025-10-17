import React from "react";
import * as style from "./CTGHistoryParamsTable.module.css";
import {PARAM_GROUPS, PREDICTIONS} from "@entities/ctg-history/model/paramsConfig";
import {CTGStatus} from "@shared/const/ctgColors";
import {CTGHistory} from "@entities/ctg-history/model/types";
import {getColorByCTGStatus} from "@shared/lib/utils/ctgColorUtils";

type Mode = "single" | "compare";

interface CTGHistoryParamsTableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /**
   * Режим отображения:
   * - `"single"` — параметры для одной записи КТГ.
   * - `"compare"` — сравнение двух исследований.
   */
  mode: Mode;
  /** Данные для отображения: одно исследование или массив из двух для сравнения */
  data: CTGHistory | CTGHistory[];
}

/**
 * Таблица параметров истории КТГ.
 *
 * ### Возможности:
 * - В режиме `single` показывает параметры одного исследования:
 *   - значения из {@link PARAM_GROUPS} (ЧСС, вариабельность, UC, акцелерации и т.п.);
 *   - прогнозы из {@link PREDICTIONS} (FIGO, прогноз FIGO);
 *   - цвет фона для FIGO и прогноза зависит от статуса ({@link CTGStatus}) и берётся из {@link ctgColors}.
 *
 * - В режиме `compare` отображает сравнение двух исследований:
 *   - заголовок таблицы включает даты и срок гестации обоих исследований;
 *   - каждая строка показывает параметр для обеих записей рядом;
 *   - ячейки FIGO/прогноза подсвечиваются цветом статуса.
 *
 * ### Форматирование:
 * - Дата (`Date`) → локализованная строка (`toLocaleDateString`).
 * - `null`/`undefined` → `"—"`.
 */
const CTGHistoryParamsTable: React.FC<CTGHistoryParamsTableProps> = ({
                                                                       mode,
                                                                       data,
                                                                       ...props
                                                                     }) => {
  if (mode === "single") {
    const ctg = data as CTGHistory;

    return (
      <table {...props} className={[style.table, props.className || ''].join(' ')}>
        <tbody>
        {PARAM_GROUPS.map((group, gi) => (
          <tr key={gi}>
            {group.map((param, pi) => (
              <React.Fragment key={pi}>
                <td>{param.label}</td>
                <td
                  style={{
                    backgroundColor: param.key.includes("figo") || param.key.includes("forecast")
                      ? getFIGOBg(getValue(ctg, param.key))
                      : undefined
                  }}
                >
                  {formatValue(getValue(ctg, param.key))}
                </td>
              </React.Fragment>
            ))}
          </tr>
        ))}
        <tr>
          {PREDICTIONS.map((p, i) => (
            <td key={i}
                className={style.table__predict}
                colSpan={2}
                style={{
                  backgroundColor: getFIGOBg(getValue(ctg, p.key))
                }}>
              <div>
                <p>{p.label}</p>
                <p>{formatValue(getValue(ctg, p.key))}</p>
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
      <table {...props} className={[style.table, style.table__compare, props.className || ''].join(' ')}>
        <thead>
        <tr>
          <th></th>
          <th>
            {
              ctg1.result?.timestamp &&
                <>
                  {new Date(ctg1.result.timestamp).toLocaleDateString() ?? "Исследование 1"}<br/>
                </>
            }
            {ctg1.result?.gest_age ?? ""}
          </th>
          <th>
            {
              ctg2.result?.timestamp &&
                <>
                  {new Date(ctg2.result.timestamp).toLocaleDateString() ?? "Исследование 1"}<br/>
                </>
            }
            {ctg1.result?.gest_age ?? ""}
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

/** Форматирование значения для отображения в таблице */
function formatValue(value: unknown) {
  if (value instanceof Date) return value.toLocaleDateString();
  if (value == null) return "—";
  return String(value);
}

/** Универсальный геттер поля по ключу */
function getValue(obj: any, path: string) {
  return path.split('.').reduce((acc, part) => acc?.[part], obj);
}

/** Определение цвета ячейки для FIGO/прогноза */
function getFIGOBg(value: CTGStatus): string | undefined {
  if (!value) return;
  return getColorByCTGStatus(value);
}

export default CTGHistoryParamsTable;
