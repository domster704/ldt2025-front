import {useMemo} from "react";
import {extent, scaleLinear, scaleTime} from "d3";

/**
 * Хук для вычисления масштабов (`xScale`, `yScale`) и тиков осей
 * для графика с пороговыми зонами (threshold chart).
 *
 * ---
 * @param data Данные в формате `{ value: number; date: Date }[]`
 * @param padding Отступы по оси Y в формате `[minPadding, maxPadding]`
 * @param innerWidth Внутренняя ширина области графика (с учётом margin)
 * @param innerHeight Внутренняя высота области графика (с учётом margin)
 * @param xTicksCount Желаемое количество делений по оси X (по умолчанию 6)
 * @param yTicksCount Желаемое количество делений по оси Y (по умолчанию 6)
 *
 * ---
 * @returns Объект с масштабами и рассчитанными тиками:
 * - `xScale` — временной масштаб (ось X, даты)
 * - `yScale` — линейный масштаб (ось Y, значения)
 * - `xTicks` — массив значений для подписей по X
 * - `yTicks` — массив значений для подписей по Y
 *
 * ---
 * ### Особенности:
 * - Если данных нет → возвращаются пустые массивы тиков и масштабы без домена.
 * - Добавляет небольшой отступ (1% диапазона) по оси X для визуальной "воздушки".
 * - Значения по Y корректируются с учётом `padding`.
 * - Количество тиков по X уменьшается до `xTicksCount`, чтобы избежать наложений.
 *
 * ---
 * ### Использование:
 * ```tsx
 * const {xScale, yScale, xTicks, yTicks} = useThresholdChartScales(
 *   data,        // [{ value: 5, date: new Date() }, ...]
 *   [2, 2],      // padding: снизу и сверху
 *   width - 40,  // innerWidth
 *   height - 30, // innerHeight
 *   6,           // тиков по X
 *   6            // тиков по Y
 * );
 *
 * <AxisBottom scale={xScale} tickValues={xTicks} />
 * <AxisLeft scale={yScale} tickValues={yTicks} />
 * ```
 */
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

    const yMin = Math.max(-0.5, (minVal ?? 0) - padding[0]);
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
