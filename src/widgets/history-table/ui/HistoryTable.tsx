import React, {FC} from "react";
import * as style from "./HistoryTable.module.css";

import arrowRightImg from "@shared/assets/img/arrowRight.svg";
import {useAppSelector} from "@app/store/store";
import {selectAllCTGHistory} from "@entities/ctg-history/model/selectors";
import {CTGHistory} from "@entities/ctg-history/model/types";
import {useCTGHistory} from "@features/ctg-history-selection-provider";
import {ctgColors} from "@shared/const/ctgColors";

/**
 * **HistoryTable** — таблица для отображения списка исследований КТГ.
 *
 * ---
 * ### Основные задачи:
 * - Выводит список всех исследований КТГ с ключевыми параметрами:
 *   - Дата исследования.
 *   - Срок беременности.
 *   - Базальная ЧСС.
 *   - Маточные сокращения (UC).
 *   - FIGO статус.
 *   - Прогноз FIGO.
 * - Подсвечивает ячейки FIGO и прогноза цветом из {@link ctgColors}.
 * - Позволяет выбирать исследования (одно или два) для дальнейшего анализа
 *   через {@link useCTGHistory}.
 *
 * ---
 * ### Логика выбора:
 * - При нажатии на кнопку (стрелка вправо) вызывается `toggle(id)` из {@link useCTGHistory}.
 * - Выбранные строки получают класс `selected` для подсветки.
 * - Максимум можно выбрать **2 исследования** (см. реализацию в провайдере выбора).
 *
 * ---
 * ### Визуальная структура:
 * ```
 * ┌───────────── История кардиотокографии ──────────────┐
 * | Дата | Срок | ЧСС | UC | FIGO | Прогноз FIGO | ->  |
 * | 01.10| 38+2 | 142 | 10 | [red] Патологическая | ... |
 * | 05.10| 39+0 | 135 | 15 | [green] Норма        | ... |
 * └─────────────────────────────────────────────────────┘
 * ```
 *
 * ---
 * ### Пример использования:
 * ```tsx
 * import HistoryTable from "@widgets/history-table";
 *
 * const HistoryPage = () => (
 *   <section>
 *     <HistoryTable />
 *   </section>
 * );
 * ```
 */
const HistoryTable: FC = () => {
  const {selected, toggle} = useCTGHistory();
  const ctgHistory = useAppSelector(selectAllCTGHistory);

  const selectCTGHistoryItem = (id: number) => {
    toggle(id);
  }

  return (
    <div className={style.historyTable__container}>
      <h2>История кардиотокографии</h2>

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
            const figoColor = ctgColors[ctgHistoryItem.figo];
            const forecastColor = ctgColors[ctgHistoryItem.forecast];
            const isSelected = selected.includes(ctgHistoryItem.id);

            return (
              <tr key={ctgHistoryItem.id}
                  className={isSelected ? style.selected : ""}>
                <td>{ctgHistoryItem.date.toLocaleDateString()}</td>
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
                  <button className={style.selectButton}
                          onClick={() => selectCTGHistoryItem(ctgHistoryItem.id)}>
                    <img src={arrowRightImg} alt=""/>
                  </button>
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;
