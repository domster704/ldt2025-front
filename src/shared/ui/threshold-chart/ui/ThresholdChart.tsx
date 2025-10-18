import React, {FC, useRef} from "react";
import {timeFormat} from "d3";
import {AxisBottom, AxisLeft} from "@visx/axis";
import {LinePath} from "@visx/shape";
import {useResizeObserver} from "@shared/lib/hooks/useResizeObserver";
import {useThresholdChartScales} from "@shared/ui/threshold-chart/lib/hooks/useThresholdChartScales";

/**
 * Свойства компонента {@link ThresholdChart}.
 */
export interface ThresholdChartProps {
  /**
   * Зоны графика, отображаемые цветными прямоугольниками.
   * Каждая зона состоит из:
   * - `label` — название (например, `"good"`, `"dangerous"`).
   * - `ranges` — массив диапазонов по оси Y ([min, max]).
   * - `color` — цвет фона для зоны.
   */
  zones: {
    label: string;
    ranges: [number, number][];
    color: string;
  }[];

  /**
   * Данные для отрисовки линии графика.
   * Каждый элемент имеет:
   * - `value` — значение по оси Y.
   * - `date` — значение по оси X (временная шкала).
   */
  data: { value: number; date: Date }[];

  /**
   * Внутренние отступы (padding) для оси Y.
   * Указываются как `[нижний, верхний]`.
   */
  padding: [number, number];
}

const margin = {top: 0, right: 0, bottom: 40, left: 36};

/**
 * Компонент для отображения **линейного графика с зонами порогов**.
 *
 * ---
 * ### Особенности:
 * - Использует `d3` для масштабов и осей.
 * - Рисует цветные зоны по оси Y (например, «норма», «опасно»).
 * - Отображает линии сетки по X и Y.
 * - Строит линию графика и точки (`circle`) для каждого значения.
 * - Автоматически рассчитывает тики осей с помощью {@link useThresholdChartScales}.
 *
 * ---
 * ### Использование:
 * @example
 * ```tsx
 * import ThresholdChart from "@shared/ui/threshold-chart";
 *
 * const data = [
 *   { value: 120, date: new Date("2025-09-01") },
 *   { value: 135, date: new Date("2025-09-02") },
 *   { value: 110, date: new Date("2025-09-03") },
 * ];
 *
 * const zones = [
 *   { label: "good", ranges: [[110, 150]], color: "#c3ffac" },
 *   { label: "dangerous", ranges: [[0, 109]], color: "#ffc2ac" },
 * ];
 *
 * <div style={{ width: 600, height: 300 }}>
 *   <ThresholdChart zones={zones} data={data} padding={[10, 10]} />
 * </div>
 * ```
 */
const ThresholdChart: FC<ThresholdChartProps> = ({zones, data, padding}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const {width, height} = useResizeObserver(svgRef);

  const innerWidth = Math.max(0, width - margin.left - margin.right);
  const innerHeight = Math.max(0, height - margin.top - margin.bottom);

  const {xScale, yScale, xTicks, yTicks} = useThresholdChartScales(data, padding, innerWidth, innerHeight);

  return (
    <svg ref={svgRef} width="100%" height="100%">
      <defs>
        <clipPath id="chart-area">
          <rect x={0} y={0} width={innerWidth} height={innerHeight}/>
        </clipPath>
      </defs>

      <g transform={`translate(${margin.left},${margin.top})`}>
        <g clipPath="url(#chart-area)">
          {/* Зоны порогов */}
          {zones.flatMap((zone, i) =>
            zone.ranges
              .filter(([a, b]) => a !== b)
              .map((range, j) => (
                <rect key={`${i}-${j}`}
                      x={0}
                      y={yScale(range[1])}
                      width={innerWidth}
                      height={yScale(range[0]) - yScale(range[1])}
                      fill={zone.color}
                />
              ))
          )}

          {/* Линии сетки */}
          {xTicks.map((t, i) => (
            <line key={`gx-${i}`} x1={xScale(t)} y1={0} x2={xScale(t)} y2={innerHeight}
                  stroke="#e6e6e6" shapeRendering="crispEdges"/>
          ))}
          {yTicks.map((t, i) => (
            <line key={`gy-${i}`} x1={0} y1={yScale(t)} x2={innerWidth} y2={yScale(t)}
                  stroke="#e6e6e6" shapeRendering="crispEdges"/>
          ))}

          {/* Линия графика */}
          <LinePath data={data}
                    x={d => xScale(d.date)}
                    y={d => yScale(d.value)}
                    stroke="#003c66"
                    strokeWidth={3}
          />

          {/* Точки графика */}
          {data.map((d, i) => (
            <circle key={i}
                    cx={xScale(d.date)}
                    cy={yScale(d.value)}
                    r={4}
                    fill="white"
                    stroke="#003c66"
                    strokeWidth={2}/>
          ))}
        </g>

        {/* Ось X */}
        <AxisBottom top={innerHeight}
                    scale={xScale}
                    tickValues={xTicks}
                    tickFormat={timeFormat("%d.%m") as any}
                    tickLabelProps={() => ({
                      fontFamily: "var(--font-family)",
                      fontWeight: 500,
                      fontSize: 12,
                      textAnchor: "middle",
                      fill: "#333",
                      dy: "1.25rem",
                    })}
        />

        {/* Ось Y */}
        <AxisLeft scale={yScale}
                  numTicks={yTicks.length}
                  tickValues={yTicks}
                  tickLabelProps={() => ({
                    fontFamily: "var(--font-family)",
                    fontWeight: 500,
                    fontSize: 12,
                    textAnchor: "end",
                    dominantBaseline: "middle",
                    fill: "#333",
                    dx: "-0.25rem",
                  })}
        />
      </g>
    </svg>
  );
};

export default ThresholdChart;
