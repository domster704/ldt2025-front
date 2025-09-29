import React, {FC, useMemo, useRef} from "react";
import {extent, scaleLinear, scaleTime, timeFormat} from "d3";
import {AxisBottom, AxisLeft} from "@visx/axis";
import {LinePath} from "@visx/shape";
import {useResizeObserver} from "@shared/lib/hooks/useResizeObserver";

export interface ThresholdChartProps {
  zones: {
    label: string;
    ranges: [number, number][];
    color: string;
  }[];
  data: { value: number; date: Date }[];
  padding: [number, number];
}

const margin = {top: 0, right: 0, bottom: 40, left: 36};

const ThresholdChart: FC<ThresholdChartProps> = ({zones, data, padding}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const {width, height} = useResizeObserver(svgRef);

  const innerWidth = Math.max(0, width - margin.left - margin.right);
  const innerHeight = Math.max(0, height - margin.top - margin.bottom);

  const [minDateRaw, maxDateRaw] = useMemo(
    () => extent(data, d => d.date) as [Date, Date],
    [data]
  );
  const [minVal, maxVal] = useMemo(
    () => extent(data, d => d.value) as [number, number],
    [data]
  );

  const yMin = Math.max(-1, (minVal ?? 0) - padding[0]);
  const yMax = (maxVal ?? 0) + padding[1];

  const xPadMs = Math.max(
    1,
    ((maxDateRaw?.getTime() ?? 0) - (minDateRaw?.getTime() ?? 0)) * 0.01
  );
  const minDate = new Date(minDateRaw.getTime() - xPadMs);
  const maxDate = new Date(maxDateRaw.getTime() + xPadMs);

  const xScale = useMemo(
    () => scaleTime().domain([minDate, maxDate]).range([0, Math.max(0, innerWidth - 1)]),
    [minDate, maxDate, innerWidth]
  );

  const yScale = useMemo(
    () => scaleLinear().domain([yMin, yMax]).range([innerHeight, 0]),
    [yMin, yMax, innerHeight]
  );

  const desiredXTicks = 6;

  const rawXTicks = xScale.ticks(Math.max(desiredXTicks * 2, 2));
  const step = Math.max(1, Math.ceil(rawXTicks.length / desiredXTicks));
  const xTicks = rawXTicks.filter((_, i) => i % step === 0).slice(0, desiredXTicks);

  const yTicks = yScale.ticks(6);

  return (
    <svg ref={svgRef} width="100%" height="100%">
      <defs>
        <clipPath id="chart-area">
          <rect x={0} y={0} width={innerWidth + 1} height={innerHeight + 1}/>
        </clipPath>
      </defs>

      <g transform={`translate(${margin.left},${margin.top})`}>
        <g clipPath="url(#chart-area)">
          {zones.map((zone, i) =>
            zone.ranges
              .filter(([a, b]) => a !== b)
              .map((range, j) => (
                <rect
                  key={`${i}-${j}`}
                  x={0}
                  y={yScale(range[1])}
                  width={innerWidth}
                  height={yScale(range[0]) - yScale(range[1])}
                  fill={zone.color}
                />
              ))
          )}

          {xTicks.map((t, i) => (
            <line
              key={`gx-${+t}-${i}`}
              x1={xScale(t)}
              y1={0}
              x2={xScale(t)}
              y2={innerHeight}
              stroke="#e6e6e6"
              shapeRendering="crispEdges"
            />
          ))}

          {yTicks.map((t, i) => (
            <line
              key={`gy-${t}-${i}`}
              x1={0}
              y1={yScale(t)}
              x2={innerWidth}
              y2={yScale(t)}
              stroke="#e6e6e6"
              shapeRendering="crispEdges"
            />
          ))}

          <LinePath
            data={data}
            x={d => xScale(d.date)}
            y={d => yScale(d.value)}
            stroke="#003c66"
            strokeWidth={3}
          />

          {data.map((d, i) => (
            <circle key={i}
                    cx={xScale(d.date)}
                    cy={yScale(d.value)}
                    r={4}
                    fill="white"
                    stroke="#003c66"
                    strokeWidth={2}
            />
          ))}
        </g>

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

        <AxisLeft scale={yScale}
                  numTicks={6}
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
