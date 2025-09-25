import {StreamPoint} from "@entities/session-stream/model/types";
import React, {FC, useEffect, useState} from "react";
import {line} from "@visx/shape";
import {curveMonotoneX} from "d3-shape";
import {AxisBottom} from "@visx/axis";
import {ScaleLinear} from "d3";


interface LivePathProps {
  color: string;
  width: number;
  height: number;
  dataSource: StreamPoint[];
  xScale: ScaleLinear<number, number, never>;
  yScale: ScaleLinear<number, number, never>;
}

const LivePath: FC<LivePathProps> = ({
                                       color,
                                       width,
                                       height,
                                       dataSource,
                                       xScale,
                                       yScale,
                                     }) => {
  const [offset, setOffset] = useState(0);

  const lastElement: StreamPoint | undefined = dataSource[dataSource.length - 1];

  useEffect(() => {
    if (dataSource.length < 2) return;
    const preLast = dataSource[dataSource.length - 2];

    if (lastElement && lastElement.x > width - 100) {
      setOffset((prev) => prev - (lastElement.x - preLast.x));
    }
  }, [dataSource.length]);

  const lineGenerator = line<StreamPoint>()
    .defined((d) => !isNaN(d.y))
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))
    .curve(curveMonotoneX);

  const pathD = lineGenerator(dataSource) || "";

  return (
    <>
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={3}
        transform={`translate(${offset},0)`}
      />

      <g transform={`translate(${offset},0)`}>
        <AxisBottom
          top={height}
          scale={xScale}
          tickFormat={(v) => `${v}s`}
        />
      </g>
    </>
  );
};

export default LivePath;
