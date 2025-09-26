import React, {forwardRef} from "react";
import LivePath from "@shared/ui/LivePath";
import {GridColumns, GridRows} from "@visx/grid";
import {AxisBottom, AxisRight} from "@visx/axis";
import {ScaleLinear} from "d3";

import * as style from "./Chart.module.css";

interface ChartProps {
  color: string;
  dataSource: { x: number; y: number }[];
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  xMax: number;
  yMax: number;
  isDragging?: boolean;

  onWheel?: (e: React.WheelEvent<SVGSVGElement>) => void;
  onMouseDown?: (e: React.MouseEvent<SVGSVGElement>) => void;
  onMouseMove?: (e: React.MouseEvent<SVGSVGElement>) => void;
  onMouseUp?: (e: React.MouseEvent<SVGSVGElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<SVGSVGElement>) => void;

  onTouchStart?: (e: React.TouchEvent<SVGSVGElement>) => void;
  onTouchMove?: (e: React.TouchEvent<SVGSVGElement>) => void;
  onTouchEnd?: (e: React.TouchEvent<SVGSVGElement>) => void;
}

const HEIGHT = 300;
const MARGIN = {top: 8, right: 48, bottom: 24, left: 16};

const Chart = forwardRef<SVGSVGElement, ChartProps>(
  (
    {
      color,
      dataSource,
      xScale,
      yScale,
      xMax,
      yMax,
      isDragging,
      onWheel,
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    },
    ref
  ) => {
    return (
      <div className={style.container}>
        <svg
          ref={ref}
          width="100%"
          height={HEIGHT}
          onWheel={onWheel}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{cursor: isDragging ? "grabbing" : "default"}}
        >
          <rect x={0} y={0} width="100%" height={HEIGHT} fill="#fff"/>

          <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
            <GridRows
              scale={yScale}
              width={xMax}
              height={yMax}
              stroke="#eee"/>
            <GridColumns
              scale={xScale}
              width={xMax}
              height={yMax}
              stroke="#eee"
            />

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
            <AxisRight left={xMax}
                       scale={yScale}
                       numTicks={5}
            />
          </g>
        </svg>
      </div>
    );
  }
);

Chart.displayName = "Chart";

export default Chart;
