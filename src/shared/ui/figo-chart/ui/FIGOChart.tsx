import React, {FC, useMemo, useRef} from "react";
import {extent, scalePoint, scaleTime, timeFormat} from "d3";
import {AxisBottom, AxisLeft} from "@visx/axis";
import {LinePath} from "@visx/shape";
import {CTGHistory} from "@entities/ctg-history/model/types";
import {useResizeObserver} from "@shared/lib/hooks/useResizeObserver";
import {ctgColors, CTGStatus} from "@shared/const/ctgColors";

interface FIGOChartProps {
  data: CTGHistory[];
}

const figoLevels: CTGStatus[] = [
  CTGStatus.Normal,
  CTGStatus.Doubtful,
  CTGStatus.Pathological,
  CTGStatus.Preterminal,
];

const pad = 24 * 60 * 60 * 1000;
const margin = {top: 20, right: 20, bottom: 30, left: 140};

const FIGOChart: FC<FIGOChartProps> = ({data}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const {width, height} = useResizeObserver(svgRef);

  const innerWidth = Math.max(0, width - margin.left - margin.right);
  const innerHeight = height - margin.top - margin.bottom;

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

  const [minDate, maxDate] = useMemo(() => {
    if (!normalizedData.length) {
      const now = new Date();
      return [now, now];
    }
    const [min, max] = extent(normalizedData, d => d.uniqueDate) as [Date, Date];
    return [new Date(min.getTime() - pad), new Date(max.getTime() + pad)];
  }, [normalizedData]);

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

  const tickValues = useMemo(() => normalizedData.map(d => d.uniqueDate), [normalizedData]);

  const showEvery = Math.ceil(tickValues.length / 7);

  return (
    <svg ref={svgRef} width={"100%"} height={"100%"}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {
          normalizedData.map(d => (
            <line key={`line-${d.id}`}
                  x1={xScale(d.uniqueDate)}
                  y1={0}
                  x2={xScale(d.uniqueDate)}
                  y2={innerHeight}
                  stroke="#ccc"
            />
          ))
        }

        {
          figoLevels.map(level => (
            <line key={level}
                  x1={0}
                  y1={yScale(level)!}
                  x2={innerWidth}
                  y2={yScale(level)!}
                  stroke={ctgColors[level]}
                  strokeWidth={7}
            />
          ))
        }

        <LinePath data={normalizedData}
                  x={d => xScale(d.uniqueDate) ?? 0}
                  y={d => yScale(d.figo) ?? 0}
                  stroke="#003c66"
                  strokeWidth={4}
        />

        {
          normalizedData.map(d => (
            <circle key={`circle-${d.id}`}
                    cx={xScale(d.uniqueDate)}
                    cy={yScale(d.figo)!}
                    r={4}
                    fill="white"
                    stroke="steelblue"
                    strokeWidth={2}
            />
          ))
        }

        <AxisBottom top={innerHeight}
                    scale={xScale}
                    tickValues={tickValues}
                    tickFormat={(d, i) =>
                      i % showEvery === 0 ? timeFormat("%d.%m.%y")(d as Date) : "" // пропускаем подписи
                    }
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
                    dx: "-0.25rem",
                  })}
        />
      </g>
    </svg>
  );
};

export default FIGOChart;
