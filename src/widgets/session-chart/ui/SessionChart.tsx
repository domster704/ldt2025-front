import React, {FC, useRef} from "react";
import {useResizeObserver} from "@shared/lib/hooks/useResizeObserver";
import Chart, {useChartScales} from "@shared/ui/chart";
import {useChartScroll} from "@features/chart-scroll/lib/hooks/useChartScroll";
import {HighlightBand} from "@shared/ui/chart/ui/Chart";

const MARGIN = {top: 8, right: 16, bottom: 24, left: 30};
const PADDING = 30;
const SLIDE_WINDOW_TIME = 360;

interface SessionChartProps {
  color: string;
  dataSource: { x: number; y: number }[];
  highlightBands?: HighlightBand[];
}

const SessionChart: FC<SessionChartProps> = ({color, dataSource, highlightBands}) => {
  const ref = useRef<SVGSVGElement>(null);

  const {width, height} = useResizeObserver(ref);

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
  } = useChartScroll({window_: SLIDE_WINDOW_TIME, xMax: width});

  const {xMax, yMax, xScale, yScale} = useChartScales({
    width,
    height,
    margins: MARGIN,
    dataSource,
    window_: SLIDE_WINDOW_TIME,
    padding: PADDING,
    scrollOffset,
  });

  return (
    <Chart ref={ref}
           margins={MARGIN}
           color={color}
           dataSource={dataSource}
           xScale={xScale}
           yScale={yScale}
           xMax={xMax}
           yMax={yMax}
           highlightBands={highlightBands}
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
