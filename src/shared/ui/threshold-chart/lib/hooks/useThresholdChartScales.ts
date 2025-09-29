import {useMemo} from "react";
import {extent, scaleLinear, scaleTime} from "d3";


export function useThresholdChartScales(
  data: { value: number; date: Date }[],
  padding: [number, number],
  innerWidth: number,
  innerHeight: number,
  xTicksCount = 6,
  yTicksCount = 6
) {
  return useMemo(() => {
    if (!data.length) {
      const xScale = scaleTime().range([0, innerWidth]);
      const yScale = scaleLinear().range([innerHeight, 0]);
      return {xScale, yScale, xTicks: [], yTicks: []};
    }

    const [minDateRaw, maxDateRaw] = extent(data, d => d.date) as [Date, Date];
    const [minVal, maxVal] = extent(data, d => d.value) as [number, number];

    const yMin = Math.max(-1, (minVal ?? 0) - padding[0]);
    const yMax = (maxVal ?? 0) + padding[1];

    const xPadMs = Math.max(
      1,
      ((maxDateRaw.getTime() ?? 0) - (minDateRaw.getTime() ?? 0)) * 0.01
    );
    const minDate = new Date(minDateRaw.getTime() - xPadMs);
    const maxDate = new Date(maxDateRaw.getTime() + xPadMs);

    const xScale = scaleTime().domain([minDate, maxDate]).range([0, innerWidth - 1]);
    const yScale = scaleLinear().domain([yMin, yMax]).range([innerHeight, 0]);

    const rawXTicks = xScale.ticks(xTicksCount * 2);
    const step = Math.max(1, Math.ceil(rawXTicks.length / xTicksCount));
    const xTicks = rawXTicks.filter((_, i) => i % step === 0).slice(0, xTicksCount);

    const yTicks = yScale.ticks(yTicksCount);

    return {xScale, yScale, xTicks, yTicks};
  }, [data, padding, innerWidth, innerHeight, xTicksCount, yTicksCount]);
}