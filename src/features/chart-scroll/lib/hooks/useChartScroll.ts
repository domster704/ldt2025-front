import React, {useCallback, useRef, useState} from "react";

/**
 * Кастомный React-хук для управления **скроллом и перетаскиванием графика**.
 *
 * Используется в компонентах с интерактивными графиками (например, SessionChart),
 * чтобы обрабатывать колёсико мыши, drag-n-drop и touch-события.
 *
 * ---
 * ### Входные параметры:
 * - `window_` — временной диапазон (в условных единицах, напр. мс), отображаемый на экране.
 * - `xMax` — ширина области графика в пикселях.
 *
 * ---
 * ### Состояния:
 * - `scrollOffset: number` — текущее смещение окна просмотра (по X).
 * - `isDragging: boolean` — флаг, указывающий, выполняется ли сейчас drag (перетаскивание).
 *
 * ---
 * ### Обработчики событий:
 * - `handleWheel` — скролл колёсиком мыши.
 * - `handleMouseDown` — начало перетаскивания мышью.
 * - `handleMouseMove` — обработка перемещения мыши (drag).
 * - `handleMouseUp` — завершение drag мышью.
 * - `handleTouchStart` — начало перетаскивания на тач-экране.
 * - `handleTouchMove` — обработка перемещения пальцем.
 * - `handleTouchEnd` — завершение drag на тач-экране.
 *
 * ---
 * ### Алгоритм:
 * - При **скролле колесом** смещение увеличивается или уменьшается на фиксированный шаг.
 * - При **drag мышью/тачем** смещение пересчитывается в зависимости от сдвига (`dx`) и коэффициента `secPerPx = window_ / xMax`.
 */
export function useChartScroll({window_, xMax}: { window_: number; xMax: number }) {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<number | null>(null);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    const step = 1;
    setScrollOffset((prevOffset) =>
      e.deltaY > 0 ? prevOffset + step : Math.max(0, prevOffset - step)
    );
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = e.clientX;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || dragStart.current === null) return;
      const dx = e.clientX - dragStart.current;
      const secPerPx = window_ / xMax;
      setScrollOffset((prevOffset) => Math.max(0, prevOffset + dx * secPerPx));
      dragStart.current = e.clientX;
    },
    [isDragging, window_, xMax]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    dragStart.current = null;
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging || dragStart.current === null) return;
      const dx = e.touches[0].clientX - dragStart.current;
      const secPerPx = window_ / xMax;
      setScrollOffset((prevOffset) => Math.max(0, prevOffset + dx * secPerPx));
      dragStart.current = e.touches[0].clientX;
    },
    [isDragging, window_, xMax]
  );

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStart.current = e.touches[0].clientX;
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    dragStart.current = null;
  }, []);

  return {
    scrollOffset,
    isDragging,
    handleWheel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}
