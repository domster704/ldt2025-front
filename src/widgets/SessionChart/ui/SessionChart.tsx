import React, { FC, useRef } from "react";
import { useResizeObserver } from "@shared/lib/hooks/useResizeObserver";
import Chart from "@shared/ui/Chart";
import {useChartScroll} from "@features/chart-scroll/lib/hooks/useChartScroll";
import {useChartScales} from "@shared/ui/Chart/lib/hooks";

const HEIGHT = 300;
const MARGIN = { top: 8, right: 48, bottom: 24, left: 16 };
const PADDING = 10;
const WINDOW = 20;

interface SessionChartProps {
  color: string;
  dataSource: { x: number; y: number }[];
}

const SessionChart: FC<SessionChartProps> = ({ color, dataSource }) => {
  const ref = useRef<SVGSVGElement>(null);

  const width = useResizeObserver(ref);

  const {
    scrollOffset,
    isDragging,
    handleWheel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useChartScroll({ window: WINDOW, xMax: width });

  const { xMax, yMax, xScale, yScale } = useChartScales({
    width,
    height: HEIGHT,
    margins: MARGIN,
    dataSource,
    window: WINDOW,
    padding: PADDING,
    scrollOffset,
  });

  return (
    <Chart
      ref={ref}
      color={color}
      dataSource={dataSource}
      xScale={xScale}
      yScale={yScale}
      xMax={xMax}
      yMax={yMax}
      isDragging={isDragging}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    />
  );
};

export default SessionChart;
