import {useMemo} from "react";
import {scaleLinear} from "@visx/scale";

interface ScaleOptions {
  /** Ширина контейнера (в пикселях) */
  width: number;
  /** Высота контейнера (в пикселях) */
  height: number;
  /** Отступы вокруг области рисования */
  margins: { top: number; right: number; bottom: number; left: number };
  /** Исходные данные для графика: массив точек {x, y} */
  dataSource: { x: number; y: number }[];
  /** Размер "окна" отображения по оси X (например, последние N миллисекунд) */
  window_: number;
  /** Внутренний отступ (padding) для оси Y */
  padding: number;
  /** Смещение прокрутки по оси X (используется для навигации по данным) */
  scrollOffset: number;
}

/**
 * Хук для построения масштабов (scale) графика на основе данных и размеров контейнера.
 *
 * ---
 * ### Логика:
 * 1. Рассчитывает доступную ширину (`xMax`) и высоту (`yMax`) с учётом отступов.
 * 2. Находит минимальные и максимальные значения Y в последних точках (`lastN`).
 * 3. Для оси X:
 *    - minX — первый элемент данных (или 0).
 *    - maxX — последний элемент данных (или `window_`).
 *    - `left` и `right` ограничиваются с учётом `scrollOffset`.
 * 4. Строит линейные масштабы `xScale` и `yScale` с помощью `@visx/scale`.
 *
 * ---
 * ### Возвращает:
 * - `xMax`, `yMax` — размеры области рисования.
 * - `xScale`, `yScale` — масштабные функции для осей.
 * - `left`, `right` — границы текущего окна по оси X.
 *
 * ---
 * ### Использование:
 * Обычно используется внутри графиков (`Chart`, `SessionChart` и др.)
 * для преобразования данных (времени, значений ЧСС, UC и т.п.) в координаты на SVG.
 *
 * ---
 * @param options Параметры построения масштабов (см. {@link ScaleOptions})
 * @returns Объект с масштабами и размерами
 *
 * ---
 * @example
 * ```tsx
 * const {xMax, yMax, xScale, yScale} = useChartScales({
 *   width: 800,
 *   height: 400,
 *   margins: {top: 10, right: 20, bottom: 30, left: 40},
 *   dataSource: data,
 *   window_: 60000, // последние 60 секунд
 *   padding: 10,
 *   scrollOffset: 0,
 * });
 *
 * // Теперь xScale и yScale можно использовать для построения осей и линий
 * ```
 */
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
