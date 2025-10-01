import {StreamPoint} from "@entities/session-stream";
import React, {FC, useMemo} from "react";
import {line} from "@visx/shape";
import {curveMonotoneX} from "d3-shape";
import {ScaleLinear} from "d3";

interface LivePathProps {
  color: string;
  dataSource: StreamPoint[];
  xScale: ScaleLinear<number, number, never>;
  yScale: ScaleLinear<number, number, never>;
}

const LivePath: FC<LivePathProps> = ({
                                       color,
                                       dataSource,
                                       xScale,
                                       yScale,
                                     }) => {
  const pathD = useMemo(() => {
    const lineGenerator = line<StreamPoint>()
      .defined(d => !isNaN(d.y))
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))
      .curve(curveMonotoneX);

    return lineGenerator(dataSource) || "";
  }, [dataSource, xScale, yScale]);

  return <path d={pathD} fill="none" stroke={color} strokeWidth={2}/>;
};

export default LivePath;
