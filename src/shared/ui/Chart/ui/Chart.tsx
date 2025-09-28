import React, {forwardRef, useEffect, useRef} from "react";
import LivePath from "@shared/ui/LivePath";
import {GridColumns, GridRows} from "@visx/grid";
import {AxisBottom, AxisLeft} from "@visx/axis";
import {ScaleLinear} from "d3";

import * as style from "./Chart.module.css";

interface ChartProps {
  margins: { top: number; right: number; bottom: number; left: number };
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

const Chart = forwardRef<SVGSVGElement, ChartProps>(
  (
    {
      margins,
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
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
      if (dataSource.length > 0 && startTimeRef.current === null) {
        startTimeRef.current = Date.now();
      }
    }, [dataSource]);

    return (
      <div className={style.container}>
        <svg ref={ref}
             width="100%"
             onWheel={onWheel}
             onMouseDown={onMouseDown}
             onMouseMove={onMouseMove}
             onMouseUp={onMouseUp}
             onMouseLeave={onMouseLeave}
             onTouchStart={onTouchStart}
             onTouchMove={onTouchMove}
             onTouchEnd={onTouchEnd}
             style={{
               cursor: isDragging ? "grabbing" : "default",
             }}>
          <g transform={`translate(${margins.left},${margins.top})`}>

            <rect x={0}
                  y={yScale(150)}
                  width={xMax}
                  height={Math.min(yScale(110), yMax) - yScale(150)}
                  fill="#cceddd"/>

            <GridRows scale={yScale}
                      width={xMax}
                      height={yMax}
                      stroke="#ccc"/>

            <GridColumns scale={xScale}
                         width={xMax}
                         height={yMax}
                         stroke="#ccc"/>

            <LivePath color={color}
                      dataSource={dataSource}
                      xScale={xScale}
                      yScale={yScale}/>

            <AxisLeft scale={yScale}
                      numTicks={5}/>

            <AxisBottom top={yMax}
                        scale={xScale}
                        numTicks={6}
                        tickFormat={(v) => {
                          const time = new Date((startTimeRef.current || Date.now()) + (v as number) * 1000);
                          return time.toLocaleTimeString("ru-RU", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit"
                          });
                        }}
                        tickLabelProps={() => ({
                          fontWeight: "bold",
                          textAnchor: "middle",
                          fontSize: "0.625rem",
                          dy: "0.25rem",
                        })}/>
          </g>
        </svg>
      </div>
    );
  }
);

Chart.displayName = "Chart";

export default Chart;
