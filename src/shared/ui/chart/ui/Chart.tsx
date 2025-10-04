import React, {forwardRef, useEffect, useRef} from "react";
import LivePath from "@shared/ui/live-path";
import {GridColumns, GridRows} from "@visx/grid";
import {AxisBottom, AxisLeft} from "@visx/axis";

import * as style from "./Chart.module.css";
import type {ScaleLinear} from "d3";

/**
 * Диапазон для подсветки областей на графике.
 * Используется для отображения "нормальных" или "опасных" значений.
 */
export interface HighlightBand {
  /** Нижняя граница диапазона (по Y) */
  from: number;
  /** Верхняя граница диапазона (по Y) */
  to: number;
  /** Цвет заливки диапазона */
  fill: string;
}

interface ChartProps {
  /** Отступы вокруг области графика */
  margins: { top: number; right: number; bottom: number; left: number };
  /** Цвет линии графика */
  color: string;
  /** Данные для отображения (`x` — обычно время, `y` — значение) */
  dataSource: { x: number; y: number }[];
  /** Масштаб по оси X */
  xScale: ScaleLinear<number, number>;
  /** Масштаб по оси Y */
  yScale: ScaleLinear<number, number>;
  /** Ширина области построения (без отступов) */
  xMax: number;
  /** Высота области построения (без отступов) */
  yMax: number;
  /** Флаг "перетаскивания" (меняет курсор на grabbing) */
  isDragging?: boolean;

  /** Подсветка диапазонов (например, зона нормы или риска) */
  highlightBands?: HighlightBand[];

  isUseClipPath?: boolean;

  /** Обработчики событий мыши и тач-жестов */
  onWheel?: (e: React.WheelEvent<SVGSVGElement>) => void;
  onMouseDown?: (e: React.MouseEvent<SVGSVGElement>) => void;
  onMouseMove?: (e: React.MouseEvent<SVGSVGElement>) => void;
  onMouseUp?: (e: React.MouseEvent<SVGSVGElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<SVGSVGElement>) => void;

  onTouchStart?: (e: React.TouchEvent<SVGSVGElement>) => void;
  onTouchMove?: (e: React.TouchEvent<SVGSVGElement>) => void;
  onTouchEnd?: (e: React.TouchEvent<SVGSVGElement>) => void;
}

/**
 * Универсальный SVG-график для отображения временных рядов (например, FHR/UC).
 *
 * ---
 * ### Возможности:
 * - Рисует сетку (оси X и Y).
 * - Отображает линии данных с помощью {@link LivePath}.
 * - Поддерживает подсветку диапазонов (`highlightBands`).
 * - Интегрируется с хендлерами прокрутки, drag'n'drop и touch-событиями.
 *
 * ---
 * ### Особенности:
 * - `xScale` и `yScale` должны быть предварительно рассчитаны через {@link useChartScales}.
 * - Время по оси X отображается как `HH:MM:SS` в формате `ru-RU`.
 * - Курсор меняется на "grabbing" при перетаскивании.
 *
 * ---
 * @component
 * @example
 * ```tsx
 * import Chart from "@shared/ui/chart";
 * import {useChartScales} from "@shared/ui/chart/lib/hooks/useChartScales";
 *
 * const Example = () => {
 *   const data = [
 *     {x: Date.now(), y: 120},
 *     {x: Date.now() + 1000, y: 125},
 *   ];
 *
 *   const {xMax, yMax, xScale, yScale} = useChartScales({
 *     width: 800,
 *     height: 300,
 *     margins: {top: 10, right: 20, bottom: 30, left: 40},
 *     dataSource: data,
 *     window_: 60000,
 *     padding: 5,
 *     scrollOffset: 0,
 *   });
 *
 *   return (
 *     <Chart
 *       margins={{top: 10, right: 20, bottom: 30, left: 40}}
 *       color="#003459"
 *       dataSource={data}
 *       xScale={xScale}
 *       yScale={yScale}
 *       xMax={xMax}
 *       yMax={yMax}
 *       highlightBands={[{from: 110, to: 150, fill: "#ccedd1"}]}
 *     />
 *   );
 * };
 * ```
 */
const Chart = forwardRef<HTMLDivElement, ChartProps>(
  (
    {
      margins,
      color,
      dataSource,
      xScale,
      yScale,
      xMax,
      yMax,
      isDragging,
      highlightBands,
      onWheel,
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      isUseClipPath=true,
    },
    ref
  ) => {
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
      if (dataSource.length > 0 && startTimeRef.current === null) {
        startTimeRef.current = Date.now();
      }
    }, [dataSource]);

    return (
      <div ref={ref} className={style.container}>
        <svg width="100%"
             onWheel={onWheel}
             onMouseDown={onMouseDown}
             onMouseMove={onMouseMove}
             onMouseUp={onMouseUp}
             onMouseLeave={onMouseLeave}
             onTouchStart={onTouchStart}
             onTouchMove={onTouchMove}
             onTouchEnd={onTouchEnd}
             style={{
               cursor: isDragging ? "grabbing" : "default",
             }}>
          <defs>
            <clipPath id="chart-area">
              <rect x={0} y={0} width={xMax} height={yMax}/>
            </clipPath>
          </defs>

          <g transform={`translate(${margins.left},${margins.top})`}>
            <g clipPath={isUseClipPath && "url(#chart-area)" || undefined}>

              {/* Подсветка диапазонов */}
              {highlightBands?.map((band, i) => {
                const y1 = yScale(band.to);
                const y2 = yScale(band.from);
                const h = Math.max(0, Math.min(y2, yMax) - Math.max(y1, 0));
                return (
                  <rect key={`band-${i}`}
                        x={0}
                        y={y1}
                        width={xMax}
                        height={h}
                        fill={band.fill}
                  />
                );
              })}

              {/* Сетка */}
              <GridRows scale={yScale} width={xMax} height={yMax} stroke="#ccc"/>
              <GridColumns scale={xScale} width={xMax} height={yMax} stroke="#ccc"/>

              {/* Вертикальная линия справа */}
              <line x1={xMax} x2={xMax} y1={0} y2={yMax} stroke="#ccc"/>

              {/* Основной путь (линия данных) */}
              <LivePath color={color} dataSource={dataSource} xScale={xScale} yScale={yScale}/>
            </g>

            {/* Ось Y */}
            <AxisLeft scale={yScale} numTicks={5}/>

            {/* Ось X (время) */}
            <AxisBottom top={yMax}
                        scale={xScale}
                        numTicks={6}
                        tickFormat={(v) => {
                          const time = new Date(v as number);
                          return time.toLocaleTimeString("ru-RU", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          });
                        }}
                        tickLabelProps={() => ({
                          fontWeight: "bold",
                          textAnchor: "middle",
                          fontSize: "0.625rem",
                          dy: "0.25rem",
                        })}
            />
          </g>
        </svg>
      </div>
    );
  }
);

Chart.displayName = "Chart";

export default Chart;
