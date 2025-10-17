import React, {FC, useMemo, useRef} from "react";
import {scalePoint} from "d3";
import {AxisBottom, AxisLeft} from "@visx/axis";
import {LinePath} from "@visx/shape";
import {CTGHistory} from "@entities/ctg-history/model/types";
import {useResizeObserver} from "@shared/lib/hooks/useResizeObserver";
import {CTGStatus} from "@shared/const/ctgColors";
import {getColorByCTGStatus} from "@shared/lib/utils/ctgColorUtils";

interface FIGOChartProps {
  ctgHistory: CTGHistory[];
}

/**
 * FIGOChart (равномерное распределение точек)
 * Каждая запись КТГ занимает одинаковое расстояние по оси X,
 * независимо от реальной даты обследования.
 */
const FIGOChart: FC<FIGOChartProps> = ({ctgHistory}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const {width, height} = useResizeObserver(svgRef);

  const innerWidth = Math.max(0, width - margin.left - margin.right);
  const innerHeight = Math.max(0, height - margin.top - margin.bottom);

  const formattedData = useMemo(() => {
    return ctgHistory.map(h => ({
      ...h,
      label: h.result.timestamp.toLocaleDateString("ru-RU"),
    }));
  }, [ctgHistory]);

  const xScale = useMemo(() => {
    return scalePoint<string>()
      .domain(formattedData.map(d => d.label))
      .range([0, innerWidth])
      .padding(0.5);
  }, [formattedData, innerWidth]);

  const yScale = useMemo(() => {
    return scalePoint<CTGStatus>()
      .domain(FIGOLevels)
      .range([innerHeight, 0]);
  }, [innerHeight]);

  return (
    <svg ref={svgRef} width="100%" height="100%">
      <g transform={`translate(${margin.left},${margin.top})`}>
        {FIGOLevels.map(level => (
          <line key={level}
                x1={0}
                y1={yScale(level)!}
                x2={innerWidth}
                y2={yScale(level)!}
                stroke={getColorByCTGStatus(level)}
                strokeWidth={7}
          />
        ))}

        <LinePath data={formattedData}
                  x={d => xScale(d.label) ?? 0}
                  y={d => yScale(d.result.figo) ?? 0}
                  stroke="#003c66"
                  strokeWidth={4}
        />

        {formattedData.map(d => (
          <circle key={d.id}
                  cx={xScale(d.label)}
                  cy={yScale(d.result.figo)!}
                  r={4}
                  fill="white"
                  stroke="steelblue"
                  strokeWidth={2}/>
        ))}

        <AxisBottom top={innerHeight}
                    scale={xScale}
                    tickFormat={(d: string) => d}
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

const FIGOLevels: CTGStatus[] = [
  CTGStatus.None,
  CTGStatus.Normal,
  CTGStatus.Doubtful,
  CTGStatus.Pathological,
  CTGStatus.Preterminal,
];

const margin = {top: 20, right: 20, bottom: 40, left: 140};

export default FIGOChart;
