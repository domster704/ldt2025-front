import React, {FC, useMemo, useRef} from "react";
import {useResizeObserver} from "@shared/lib/hooks/useResizeObserver";
import Chart, {useChartScales} from "@shared/ui/chart";
import {useChartScroll} from "@features/chart-scroll/lib/hooks/useChartScroll";
import {HighlightBand} from "@shared/ui/chart/ui/Chart";
import {StreamPoint} from "@entities/session-stream";

const MARGIN = {top: 8, right: 32, bottom: 24, left: 30};
const PADDING = 30;
/** Дефолтное окно отображения: 6 минут */
const SLIDE_WINDOW_TIME = 6 * 60 * 1000;

interface SessionChartProps {
  /** Цвет линии графика */
  color: string;
  /** Источник данных (массив точек `x` = время, `y` = значение) */
  dataSource: StreamPoint[];
  /** Опциональные зоны подсветки (например, диапазон нормы) */
  highlightBands?: HighlightBand[];
  /** Длительность окна отображения (по умолчанию 6 минут) */
  slideWindowTime?: number;
  /** Максимальное число точек (остальные будут прорежены) */
  maxPoints?: number;
  isUseClipPath?: boolean;
}

/**
 * **SessionChart** — компонент для отображения временного ряда данных (например, ЧСС или UC).
 *
 * ---
 * ### Основные задачи:
 * - Отрисовывает график по данным из массива `StreamPoint[]`.
 * - Автоматически подстраивает размер под контейнер через {@link useResizeObserver}.
 * - Ограничивает количество точек для производительности с помощью `downsample`.
 * - Поддерживает скролл и drag по оси X через {@link useChartScroll}.
 * - Строит шкалы X и Y с помощью {@link useChartScales}.
 * - Может подсвечивать диапазоны значений (`highlightBands`).
 *
 * ---
 * ### Логика:
 * - При превышении лимита `maxPoints` данные прореживаются.
 * - Окно отображения контролируется параметром `slideWindowTime` (в мс).
 * - События мыши/тача (`wheel`, `drag`, `touch`) позволяют сдвигать окно просмотра.
 *
 * ---
 * ### Пример использования:
 * ```tsx
 * import SessionChart from "@widgets/session-chart";
 *
 * const Example = () => (
 *   <SessionChart
 *     color="#c59e00"
 *     dataSource={[
 *       {x: Date.now(), y: 140},
 *       {x: Date.now() + 1000, y: 138},
 *     ]}
 *     highlightBands={[
 *       {from: 110, to: 150, fill: "#ccedd1"}, // зона нормы
 *     ]}
 *     slideWindowTime={300000}  // 5 минут
 *     maxPoints={500}
 *   />
 * );
 * ```
 */
const SessionChart: FC<SessionChartProps> = ({
                                               color,
                                               dataSource,
                                               highlightBands,
                                               isUseClipPath,
                                               slideWindowTime = SLIDE_WINDOW_TIME,
                                               maxPoints = 1000,
                                             }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Получаем размеры контейнера
  const {width, height} = useResizeObserver(ref);
  const sampledData = useMemo(() =>
      downsample(dataSource, maxPoints),
    [dataSource, maxPoints]
  );

  // Подключаем скролл и drag по оси X
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

  // Строим шкалы
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
           isUseClipPath={isUseClipPath}
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

/**
 * Вспомогательная функция для уменьшения числа точек графика.
 * Используется для повышения производительности при больших объёмах данных.
 */
function downsample(data: StreamPoint[], maxPoints = 1000) {
  if (data.length <= maxPoints) return data;
  const step = Math.ceil(data.length / maxPoints);
  return data.filter((_, i) => i % step === 0);
}

export default SessionChart;
