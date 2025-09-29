import React from "react";
import * as style from "./CTGDashboardCompare.module.css";
import {useAppSelector} from "@app/store/store";
import {selectAllCTGHistory} from "@entities/ctg-history/model/selectors";
import {CTGHistory} from "@entities/ctg-history/model/types";

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

  const ctg1 = history.find((h) => h.id === ids[0]);
  const ctg2 = history.find((h) => h.id === ids[1]);

  if (!ctg1 || !ctg2) {
    return <div className={style.compare}>Не удалось загрузить данные для сравнения</div>;
  }

  return (
    <div className={style.compare}>
      <table className={style.compare__table}>
        <thead>
        <tr>
          <th>Параметр</th>
          <th>
            {ctg1.date.toLocaleDateString()} {ctg1.gestation}
          </th>
          <th>
            {ctg2.date.toLocaleDateString()} {ctg2.gestation}
          </th>
        </tr>
        </thead>
        <tbody>
        {PARAMS.map((param) => (
          <tr key={param.key as string}>
            <td>{param.label}</td>
            <td>{formatValue(ctg1[param.key])}</td>
            <td>{formatValue(ctg2[param.key])}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default CTGDashboardCompare;
