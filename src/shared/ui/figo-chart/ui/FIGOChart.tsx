import React, {FC, useMemo, useRef} from "react";
import {extent, scalePoint, scaleTime, timeFormat} from "d3";
import {AxisBottom, AxisLeft} from "@visx/axis";
import {LinePath} from "@visx/shape";
import {CTGHistory} from "@entities/ctg-history/model/types";
import {useResizeObserver} from "@shared/lib/hooks/useResizeObserver";
import {ctgColors, CTGStatus} from "@shared/const/ctgColors";

interface FIGOChartProps {
  /** История КТГ (массив обследований) */
  data: CTGHistory[];
}

/**
 * FIGOChart — график динамики статуса FIGO во времени.
 *
 * ---
 * ### Возможности:
 * - Отображает статус FIGO для каждого обследования (точки на графике).
 * - Проводит линии между точками для наглядности.
 * - Отмечает цветные уровни (норма, сомнительно, патологическое, претерминальное).
 * - Отрисовывает оси:
 *   - X — временная шкала (даты обследований).
 *   - Y — уровни FIGO.
 * - Поддерживает адаптивный ресайз через {@link useResizeObserver}.
 *
 * ---
 * ### Логика:
 * 1. **normalizeData** — если несколько записей имеют одинаковое время, им добавляется небольшой сдвиг,
 *    чтобы точки не накладывались друг на друга.
 * 2. **extent** вычисляет минимальную и максимальную дату → масштабируется ось X.
 * 3. **scalePoint** используется для Y (фиксированные уровни FIGO).
 * 4. Отображаются линии сетки и цветные уровни FIGO.
 *
 * ---
 * @component
 * @example
 * ```tsx
 * import FIGOChart from "@shared/ui/figo-chart";
 * import {CTGStatus} from "@shared/const/ctgColors";
 *
 * const mockData = [
 *   { id: 1, date: new Date("2025-08-01"), gestation: "38+0", hr: 120, uc: 15, stv: 3.2, acceleration: 2,
 *     figo: CTGStatus.Normal, forecast: CTGStatus.Normal, graph: {} as any },
 *   { id: 2, date: new Date("2025-08-05"), gestation: "38+4", hr: 130, uc: 18, stv: 2.9, acceleration: 1,
 *     figo: CTGStatus.Doubtful, forecast: CTGStatus.Doubtful, graph: {} as any },
 * ];
 *
 * export const Example = () => (
 *   <div style={{width: "800px", height: "400px"}}>
 *     <FIGOChart data={mockData}/>
 *   </div>
 * );
 * ```
 */
const FIGOChart: FC<FIGOChartProps> = ({data}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const {width, height} = useResizeObserver(svgRef);

  const innerWidth = Math.max(0, width - margin.left - margin.right);
  const innerHeight = Math.max(0, height - margin.top - margin.bottom);

  // Убираем наложения по времени (сдвигаем повторяющиеся даты)
  const normalizedData = useMemo(() => {
    const seen = new Map<number, number>();
    return data.map(d => {
      const time = d.date.getTime();
      const count = seen.get(time) ?? 0;
      seen.set(time, count + 1);

      return {
        ...d,
        uniqueDate: new Date(time + count),
      };
    });
  }, [data]);

  // Определяем границы времени (с отступом "pad")
  const [minDate, maxDate] = useMemo(() => {
    if (!normalizedData.length) {
      const now = new Date();
      return [now, now];
    }
    const [min, max] = extent(normalizedData, d => d.uniqueDate) as [Date, Date];
    return [new Date(min.getTime() - pad), new Date(max.getTime() + pad)];
  }, [normalizedData]);

  // Масштабы
  const xScale = useMemo(
    () => scaleTime().domain([minDate, maxDate]).range([0, innerWidth]),
    [minDate, maxDate, innerWidth]
  );

  const yScale = useMemo(
    () =>
      scalePoint<CTGStatus>()
        .domain(figoLevels)
        .range([innerHeight, 0])
        .padding(0.5),
    [innerHeight]
  );

  // Тики по X (берём не все, а каждый N-й)
  const tickValues = useMemo(() => normalizedData.map(d => d.uniqueDate), [normalizedData]);
  const showEvery = Math.ceil(tickValues.length / 7);

  return (
    <svg ref={svgRef} width={"100%"} height={"100%"}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {/* Вертикальные линии для каждой даты */}
        {normalizedData.map(d => (
          <line key={`line-${d.id}`}
                x1={xScale(d.uniqueDate)}
                y1={0}
                x2={xScale(d.uniqueDate)}
                y2={innerHeight}
                stroke="#ccc"
          />
        ))}

        {/* Цветные уровни FIGO */}
        {figoLevels.map(level => (
          <line key={level}
                x1={0}
                y1={yScale(level)!}
                x2={innerWidth}
                y2={yScale(level)!}
                stroke={ctgColors[level]}
                strokeWidth={7}
          />
        ))}

        {/* Линия FIGO-тренда */}
        <LinePath data={normalizedData}
                  x={d => xScale(d.uniqueDate) ?? 0}
                  y={d => yScale(d.figo) ?? 0}
                  stroke="#003c66"
                  strokeWidth={4}
        />

        {/* Точки FIGO */}
        {normalizedData.map(d => (
          <circle key={`circle-${d.id}`}
                  cx={xScale(d.uniqueDate)}
                  cy={yScale(d.figo)!}
                  r={4}
                  fill="white"
                  stroke="steelblue"
                  strokeWidth={2}
          />
        ))}

        {/* Ось X (даты) */}
        <AxisBottom top={innerHeight}
                    scale={xScale}
                    tickValues={tickValues}
                    tickFormat={(d, i) =>
                      i % showEvery === 0 ? timeFormat("%d.%m.%y")(d as Date) : ""
                    }
                    tickLabelProps={() => ({
                      fontFamily: "var(--font-family)",
                      fontWeight: 500,
                      fontSize: 12,
                      textAnchor: "middle",
                      fill: "#333",
                    })}
        />

        {/* Ось Y (уровни FIGO) */}
        <AxisLeft scale={yScale}
                  tickLabelProps={() => ({
                    fontFamily: "var(--font-family)",
                    fontWeight: 500,
                    fontSize: 14,
                    textAnchor: "end",
                    fill: "#333",
                    dx: "-0.25rem",
                  })}
        />
      </g>
    </svg>
  );
};

const figoLevels: CTGStatus[] = [
  CTGStatus.Normal,
  CTGStatus.Doubtful,
  CTGStatus.Pathological,
  CTGStatus.Preterminal,
];

const pad = 24 * 60 * 60 * 1000;
const margin = {top: 20, right: 20, bottom: 30, left: 140};

export default FIGOChart;
