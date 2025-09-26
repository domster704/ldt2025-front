import React, {FC, useEffect, useRef, useState} from "react";
import LivePath from "@shared/ui/LivePath";
import {GridColumns, GridRows} from "@visx/grid";
import {AxisBottom, AxisRight} from "@visx/axis";

import * as style from "./Chart.module.css";
import {useChartScales} from "@shared/ui/Chart/lib/hooks";

const HEIGHT = 300;
const MARGIN = {top: 8, right: 48, bottom: 24, left: 16};
const PADDING = 10;
const WINDOW = 20;

interface ChartProps {
  color: string;
  dataSource: { x: number; y: number }[];
}

const Chart: FC<ChartProps> = ({color, dataSource}) => {
  const ref = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(() => {
      if (ref.current) {
        setWidth(ref.current.getBoundingClientRect().width);
      }
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const {xMax, yMax, xScale, yScale} = useChartScales({
    width,
    height: HEIGHT,
    margins: MARGIN,
    dataSource,
    window: WINDOW,
    padding: PADDING,
  });

  return (
    <div className={style.container}>
      <svg ref={ref} width="100%" height={HEIGHT}>
        <rect x={0} y={0} width="100%" height={HEIGHT} fill="#fff"/>

        <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
          <GridRows scale={yScale} width={xMax} height={yMax} stroke="#eee"/>
          <GridColumns scale={xScale} width={xMax} height={yMax} stroke="#eee"/>

          <LivePath
            color={color}
            dataSource={dataSource}
            xScale={xScale}
            yScale={yScale}
          />

          <AxisBottom
            top={yMax}
            scale={xScale}
            numTicks={6}
            tickFormat={(v) => `${v}s`}
          />
          <AxisRight left={xMax} scale={yScale} numTicks={5}/>
        </g>
      </svg>
    </div>
  );
};

export default Chart;
