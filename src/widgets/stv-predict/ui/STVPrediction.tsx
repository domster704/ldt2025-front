import React, {FC} from 'react';
import * as style from './STVPrediction.module.css'
import {useAppSelector} from "@app/store/store";
import ContainerWithLabel from "@shared/ui/container-with-label";
import {selectLastSTVForecast} from "@entities/session-stream";

interface STVPredictionProps {
}

/**
 * **STVPrediction** — компонент для отображения прогноза кратковременной вариабельности (STV).
 *
 * ---
 * ### Основные задачи:
 * - Получает из Redux Store последний прогноз STV через {@link selectLastSTVForecast}.
 * - Отображает значения STV для разных временных интервалов:
 *   - 3 минуты.
 *   - 5 минут.
 *   - 10 минут.
 * - Если данных нет, выводит строку `"Нет данных"`.
 * - Оборачивается в {@link ContainerWithLabel} с заголовком «Прогноз STV».
 *
 * ---
 * ### Визуальная структура:
 * ```
 * ┌────────────── Прогноз STV ──────────────┐
 * | STV 3 минуты   |  2.8                  |
 * | STV 5 минут    |  3.1                  |
 * | STV 10 минут   |  Нет данных           |
 * └────────────────────────────────────────┘
 * ```
 *
 * ---
 * ### Пример использования:
 * ```tsx
 * import STVPrediction from "@widgets/stv-predict";
 *
 * const AnalyticsPanel = () => (
 *   <section>
 *     <STVPrediction />
 *   </section>
 * );
 * ```
 */
const STVPrediction: FC<STVPredictionProps> = ({}) => {
  const stvForecast = useAppSelector(selectLastSTVForecast);

  return (
    <ContainerWithLabel label={"Прогноз STV"}
                        className={style.stbPredictionContainer}>
      <table>
        <tbody>
        <tr>
          <td>STV 3 минуты</td>
          <td>{stvForecast?.stv_3m || 'Нет данных'}</td>
        </tr>
        <tr>
          <td>STV 5 минут</td>
          <td>{stvForecast?.stv_5m || 'Нет данных'}</td>
        </tr>
        <tr>
          <td>STV 10 минут</td>
          <td>{stvForecast?.stv_10m || 'Нет данных'}</td>
        </tr>
        </tbody>
      </table>
    </ContainerWithLabel>
  );
}

export default STVPrediction;
