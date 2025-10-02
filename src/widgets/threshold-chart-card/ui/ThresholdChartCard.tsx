import React, {FC} from 'react';
import * as style from './ThresholdChartCard.module.css'
import ThresholdChart, {ThresholdChartProps} from "@shared/ui/threshold-chart/ui/ThresholdChart";

interface ThresholdChartCardProps extends ThresholdChartProps {
  /** Заголовок карточки (например, "STV (мс)" или "БЧСС (уд/мин)") */
  title: string;
}

/**
 * **ThresholdChartCard** — карточка с заголовком и графиком-порогами.
 *
 * ---
 * ### Основные задачи:
 * - Отображает заголовок метрики (`title`).
 * - Внутри рендерит {@link ThresholdChart}, которому пробрасываются все пропсы.
 * - Используется для компактного отображения графиков с зонами (STV, HR, акцелерации и т.д.).
 *
 * ---
 * ### Визуальная структура:
 * ```
 * ┌─────────────── Заголовок ────────────────┐
 * |    [ ThresholdChart ]                    |
 * └─────────────────────────────────────────┘
 * ```
 *
 * ---
 * ### Пример использования:
 * ```tsx
 * import ThresholdChartCard from "@widgets/threshold-chart-card";
 *
 * const Example = () => (
 *   <ThresholdChartCard
 *     title="STV (мс)"
 *     zones={[
 *       {label: "good", ranges: [[3, 1000]], color: "#c3ffac"},
 *       {label: "bad", ranges: [[0, 2.99]], color: "#ffc2ac"},
 *     ]}
 *     data={[
 *       {value: 3.1, date: new Date("2025-09-01")},
 *       {value: 2.8, date: new Date("2025-09-02")},
 *     ]}
 *     padding={[2, 2]}
 *   />
 * );
 * ```
 */
const ThresholdChartCard: FC<ThresholdChartCardProps> = ({
                                                           title,
                                                           ...props
                                                         }) => {
  return (
    <div className={style.thresholdChartCard}>
      <h4>{title}</h4>
      <div className={style.chart}>
        <ThresholdChart {...props}/>
      </div>
    </div>
  );
}

export default ThresholdChartCard;
