import {useMemo} from "react";
import {scaleLinear} from "@visx/scale";

interface ScaleOptions {
  width: number;
  height: number;
  margins: { top: number; right: number; bottom: number; left: number };
  dataSource: { x: number; y: number }[];
  window_: number;
  padding: number;
  scrollOffset: number;
}

export function useChartScales({
                                 width,
                                 height,
                                 margins,
                                 dataSource,
                                 window_,
                                 padding,
                                 scrollOffset,
                               }: ScaleOptions) {
  return useMemo(() => {
    const xMax = Math.max(0, width - margins.left - margins.right);
    const yMax = Math.max(0, height - margins.top - margins.bottom);

    const ys = dataSource.map((d) => d.y);
    const lastN = ys.slice(-width);

    const minY = lastN.length ? Math.min(...lastN) : 0;
    const maxY = lastN.length ? Math.max(...lastN) : 1;

    const lastX = dataSource.length ? dataSource[dataSource.length - 1].x : 0;

    const minX = dataSource.length ? dataSource[0].x : 0;
    const maxX = dataSource.length ? dataSource[dataSource.length - 1].x : window_;

    const right = maxX - scrollOffset;
    const left = Math.max(minX, right - window_);

    const xScale = scaleLinear<number>({
      domain: [left, right],
      range: [0, xMax],
    });

    const yScale = scaleLinear<number>({
      domain: [minY - padding, maxY + padding],
      range: [yMax, 0],
    });

    return {xMax, yMax, xScale, yScale, left, right};
  }, [width, height, margins, dataSource, window_, padding, scrollOffset]);
}
