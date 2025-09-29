// src/shared/ui/chart/ui/Chart.tsx
import React, {forwardRef, useEffect, useRef} from "react";
import LivePath from "@shared/ui/live-path";
import {GridColumns, GridRows} from "@visx/grid";
import {AxisBottom, AxisLeft} from "@visx/axis";

import * as style from "./Chart.module.css";
import {ScaleLinear} from "d3";

export interface HighlightBand {
  from: number;
  to: number;
  fill: string;
}

interface ChartProps {
  margins: { top: number; right: number; bottom: number; left: number };
  color: string;
  dataSource: { x: number; y: number }[];
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  xMax: number;
  yMax: number;
  isDragging?: boolean;

  highlightBands?: HighlightBand[];

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
      highlightBands,
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
        <svg
          ref={ref}
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
          }}
        >
          <g transform={`translate(${margins.left},${margins.top})`}>

            {highlightBands?.map((band, i) => {
              const y1 = yScale(band.to);
              const y2 = yScale(band.from);
              const h = Math.max(0, Math.min(y2, yMax) - Math.max(y1, 0));
              return (
                <rect key={`band-${i}`}
                      x={0}
                      y={y1}
                      width={xMax}
                      height={h}
                      fill={band.fill}
                />
              );
            })}

            <GridRows scale={yScale} width={xMax} height={yMax} stroke="#ccc"/>
            <GridColumns scale={xScale} width={xMax} height={yMax} stroke="#ccc"/>

            <line x1={xMax} x2={xMax} y1={0} y2={yMax} stroke="#ccc"/>

            <LivePath color={color} dataSource={dataSource} xScale={xScale} yScale={yScale}/>

            <AxisLeft scale={yScale} numTicks={5}/>

            <AxisBottom top={yMax}
                        scale={xScale}
                        numTicks={6}
                        tickFormat={(v) => {
                          const time = new Date((startTimeRef.current || Date.now()) + (v as number) * 1000);
                          return time.toLocaleTimeString("ru-RU", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          });
                        }}
                        tickLabelProps={() => ({
                          fontWeight: "bold",
                          textAnchor: "middle",
                          fontSize: "0.625rem",
                          dy: "0.25rem",
                        })}
            />
          </g>
        </svg>
      </div>
    );
  }
);

Chart.displayName = "Chart";

export default Chart;
