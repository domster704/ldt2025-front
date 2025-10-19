import React, {FC} from "react";

import * as style from './Dashboard.module.css';
import SessionChart from "@widgets/session-chart";
import {StreamPoint} from "@entities/session-stream";
import {HR_CONFIG} from "@shared/lib/configs/range-configs";
import {z} from "zod";
import {IndicatorZone} from "@shared/types/indicator-zone";

interface DashboardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Данные частоты сердечных сокращений плода (FHR) */
  fhrData: StreamPoint[];
  /** Данные маточных сокращений (UC) */
  ucData: StreamPoint[];
  /**
   * Длительность окна отображения по оси X (в миллисекундах).
   * Используется для скроллинга и масштабирования графика.
   */
  slideWindowTime?: number;
  /**
   * Максимальное количество точек, которое может отображаться на графике.
   * Остальные будут прорежены (downsampling).
   */
  maxPoints?: number;
  isUseClipPath?: boolean;
}

/**
 * **Dashboard** — компонент для отображения двух основных графиков:
 *
 * - **FHR (частота сердечных сокращений плода)** — верхний график.
 * - **UC (маточные сокращения)** — нижний график.
 *
 * ---
 * ### Особенности:
 * - Использует {@link SessionChart} для отрисовки каждого графика.
 * - У FHR графика добавлена подсветка диапазона нормы (110–150 уд/мин).
 * - Принимает параметры `slideWindowTime` и `maxPoints` для контроля
 *   прокрутки и производительности.
 * - Поддерживает стандартные HTML-пропсы `div` (например, `className`, `style`).
 *
 * ---
 * ### Визуальная структура:
 * ```
 * +-----------------------------------+
 * |  [График FHR] (с подсветкой нормы)|
 * |-----------------------------------|
 * |  [График UC]                      |
 * +-----------------------------------+
 * ```
 *
 * ---
 * ### Пример использования:
 * ```tsx
 * import Dashboard from "@widgets/dashboard";
 *
 * const Example = () => (
 *   <Dashboard
 *     fhrData={[
 *       {x: Date.now(), y: 140},
 *       {x: Date.now() + 1000, y: 138},
 *     ]}
 *     ucData={[
 *       {x: Date.now(), y: 15},
 *       {x: Date.now() + 1000, y: 18},
 *     ]}
 *     slideWindowTime={60000}   // окно 1 минута
 *     maxPoints={1000}          // максимум 1000 точек
 *   />
 * );
 * ```
 */
const Dashboard: FC<DashboardProps> = ({
                                         fhrData,
                                         ucData,
                                         slideWindowTime,
                                         maxPoints,
                                         isUseClipPath,
                                         ...props
                                       }) => {
  const ranges: IndicatorZone | undefined = HR_CONFIG.zones.find((zone: IndicatorZone)  => zone.label === 'good');

  return (
    <div {...props} className={[
      style.dashboard__graphs,
      props.className || ''
    ].join(' ')}>
      {/* График FHR (с подсветкой диапазона нормы) */}
      <SessionChart color={"#c59e00"}
                    slideWindowTime={slideWindowTime}
                    maxPoints={maxPoints}
                    dataSource={fhrData}
                    isUseClipPath={isUseClipPath}
                    highlightBands={[{
                      from: ranges?.ranges ? ranges.ranges[0][0] : 110,
                      to: ranges?.ranges ? ranges.ranges[0][1] : 160,
                      fill: "#ccedd1"
                    }]}/>
      {/* График UC */}
      <SessionChart color={"#003459"}
                    slideWindowTime={slideWindowTime}
                    maxPoints={maxPoints}
                    isUseClipPath={isUseClipPath}
                    dataSource={ucData}/>
    </div>
  );
};

export default Dashboard;
