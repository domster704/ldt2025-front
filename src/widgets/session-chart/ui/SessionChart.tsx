import React, {FC, useMemo, useRef} from "react";
import {useResizeObserver} from "@shared/lib/hooks/useResizeObserver";
import Chart, {useChartScales} from "@shared/ui/chart";
import {useChartScroll} from "@features/chart-scroll/lib/hooks/useChartScroll";
import {HighlightBand} from "@shared/ui/chart/ui/Chart";
import {StreamPoint} from "@entities/session-stream";

const MARGIN = {top: 8, right: 32, bottom: 24, left: 30};
const PADDING = 30;
const SLIDE_WINDOW_TIME = 6 * 60 * 1000;

interface SessionChartProps {
  color: string;
  dataSource: StreamPoint[];
  highlightBands?: HighlightBand[];
  slideWindowTime?: number;
  maxPoints?: number;
}

function downsample(data: StreamPoint[], maxPoints = 1000) {
  if (data.length <= maxPoints) return data;
  const step = Math.ceil(data.length / maxPoints);
  return data.filter((_, i) => i % step === 0);
}

const SessionChart: FC<SessionChartProps> = ({
                                               color,
                                               dataSource,
                                               highlightBands,
                                               slideWindowTime = SLIDE_WINDOW_TIME,
                                               maxPoints = 1000,
                                             }) => {
  const ref = useRef<SVGSVGElement>(null);

  const {width, height} = useResizeObserver(ref);
  const sampledData = useMemo(() =>
      downsample(dataSource, maxPoints),
    [dataSource, maxPoints]
  );


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
  } = useChartScroll({window_: slideWindowTime, xMax: width});

  const {xMax, yMax, xScale, yScale} = useChartScales({
    width,
    height,
    margins: MARGIN,
    dataSource: sampledData,
    window_: slideWindowTime,
    padding: PADDING,
    scrollOffset,
  });

  return (
    <Chart ref={ref}
           margins={MARGIN}
           color={color}
           dataSource={sampledData}
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
