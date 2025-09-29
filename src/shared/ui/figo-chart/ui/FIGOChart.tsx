import React, {FC, useMemo, useRef} from "react";
import {extent, scalePoint, scaleTime, timeFormat} from "d3";
import {AxisBottom, AxisLeft} from "@visx/axis";
import {LinePath} from "@visx/shape";
import {CTGHistory, historyColors, HistoryStatus} from "@entities/ctg-history/model/types";
import {useResizeObserver} from "@shared/lib/hooks/useResizeObserver";

interface FIGOChartProps {
  data: CTGHistory[];
}

const figoLevels: HistoryStatus[] = [
  HistoryStatus.Normal,
  HistoryStatus.Doubtful,
  HistoryStatus.Pathological,
  HistoryStatus.Preterminal,
];

const pad = 24 * 60 * 60 * 1000;
const margin = {top: 20, right: 20, bottom: 30, left: 140};

const FIGOChart: FC<FIGOChartProps> = ({data}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const {width, height} = useResizeObserver(svgRef);


  const innerWidth = Math.max(0, width - margin.left - margin.right);
  const innerHeight = height - margin.top - margin.bottom;

  const [minDate, maxDate] = useMemo(() => {
    if (!data.length) {
      const now = new Date();
      return [now, now];
    }
    const [min, max] = extent(data, d => d.date) as [Date, Date];
    return [new Date(min.getTime() - pad), new Date(max.getTime() + pad)];
  }, [data]);

  const xScale = useMemo(
    () => scaleTime().domain([minDate, maxDate]).range([0, innerWidth]),
    [minDate, maxDate, innerWidth]
  );

  const yScale = useMemo(
    () =>
      scalePoint<HistoryStatus>()
        .domain(figoLevels)
        .range([innerHeight, 0])
        .padding(0.5),
    [innerHeight]
  );

  const tickValues = useMemo(() => data.map(d => d.date), [data]);

  return (
    <svg ref={svgRef} width={"100%"} height={"100%"}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {data.map(d => (
          <line
            key={d.id}
            x1={xScale(d.date)}
            y1={0}
            x2={xScale(d.date)}
            y2={innerHeight}
            stroke="#ccc"
          />
        ))}

        {figoLevels.map(level => (
          <line key={level}
                x1={0}
                y1={yScale(level)!}
                x2={innerWidth}
                y2={yScale(level)!}
                stroke={historyColors[level]}
                strokeWidth={7}
          />
        ))}

        <LinePath data={data}
                  x={d => xScale(d.date) ?? 0}
                  y={d => yScale(d.figo) ?? 0}
                  stroke="#003c66"
                  strokeWidth={4}
        />

        {data.map(d => (
          <circle key={d.id}
                  cx={xScale(d.date)}
                  cy={yScale(d.figo)!}
                  r={4}
                  fill="white"
                  stroke="steelblue"
                  strokeWidth={2}
          />
        ))}

        <AxisBottom top={innerHeight}
                    scale={xScale}
                    numTicks={5}
                    tickValues={tickValues}
                    tickFormat={timeFormat("%d.%m.%y") as any}
                    tickLabelProps={() => ({
                      fontFamily: "var(--font-family)",
                      fontWeight: 500,
                      fontSize: 12,
                      textAnchor: "middle",
                      fill: "#333",
                    })}
        />
        <AxisLeft scale={yScale}
                  tickLabelProps={() => ({
                    fontFamily: "var(--font-family)",
                    fontWeight: 500,
                    fontSize: 14,
                    textAnchor: "end",
                    fill: "#333",
                  })}
        />
      </g>
    </svg>
  );
};

export default FIGOChart;
