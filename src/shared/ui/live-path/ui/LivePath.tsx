import {StreamPoint} from "@entities/session-stream";
import React, {FC, useMemo} from "react";
import {line} from "@visx/shape";
import {curveMonotoneX} from "d3-shape";
import {ScaleLinear} from "d3";

interface LivePathProps {
  /** Цвет линии графика */
  color: string;
  /** Источник данных — массив точек (x, y) */
  dataSource: StreamPoint[];
  /** Масштаб по оси X (время или номер точки → пиксели) */
  xScale: ScaleLinear<number, number, never>;
  /** Масштаб по оси Y (значение параметра → пиксели) */
  yScale: ScaleLinear<number, number, never>;
}

/**
 * Компонент для построения линии графика в реальном времени.
 *
 * ---
 * ### Особенности:
 * - Использует библиотеку `@visx/shape` для генерации пути `<path>`.
 * - Линия сглаживается с помощью кривой {@link curveMonotoneX}.
 * - Игнорирует точки, где `y` не является числом (фильтр `defined`).
 * - Оптимизирован с помощью {@link useMemo}, чтобы не пересчитывать путь без изменения данных.
 *
 * ---
 * ### Применение:
 * Обычно используется внутри компонентов графиков
 * (например, {@link Chart} или {@link SessionChart}),
 * чтобы отрисовать динамическую линию ЧСС или UC.
 *
 * ---
 * @component
 * @example
 * ```tsx
 * import LivePath from "@shared/ui/live-path";
 * import {scaleLinear} from "@visx/scale";
 *
 * const data = [
 *   {x: 0, y: 120},
 *   {x: 1, y: 125},
 *   {x: 2, y: 130},
 * ];
 *
 * const xScale = scaleLinear({domain: [0, 2], range: [0, 200]});
 * const yScale = scaleLinear({domain: [100, 150], range: [200, 0]});
 *
 * export const Example = () => (
 *   <svg width={200} height={200}>
 *     <LivePath color="blue" dataSource={data} xScale={xScale} yScale={yScale}/>
 *   </svg>
 * );
 * ```
 */
const LivePath: FC<LivePathProps> = ({
                                       color,
                                       dataSource,
                                       xScale,
                                       yScale,
                                     }) => {
  const pathD = useMemo(() => {
    const lineGenerator = line<StreamPoint>()
      .defined(d => !isNaN(d.y)) // фильтруем "битые" значения
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))
      .curve(curveMonotoneX); // сглаживание линии

    return lineGenerator(dataSource) || "";
  }, [dataSource, xScale, yScale]);

  return <path d={pathD} fill="none" stroke={color} strokeWidth={2}/>;
};

export default LivePath;
