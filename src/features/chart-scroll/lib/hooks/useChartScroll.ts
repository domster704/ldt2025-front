import React, {useCallback, useRef, useState} from "react";

export function useChartScroll({window, xMax}: { window: number; xMax: number }) {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<number | null>(null);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    const step = 1;
    setScrollOffset((o) => (e.deltaY > 0 ? o + step : Math.max(0, o - step)));
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = e.clientX;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || dragStart.current === null) return;
      const dx = e.clientX - dragStart.current;
      const secPerPx = window / xMax;
      setScrollOffset((o) => Math.max(0, o - dx * secPerPx));
      dragStart.current = e.clientX;
    },
    [isDragging, window, xMax]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging || dragStart.current === null) return;
      const dx = e.touches[0].clientX - dragStart.current;
      const secPerPx = window / xMax;
      setScrollOffset((o) => Math.max(0, o - dx * secPerPx));
      dragStart.current = e.touches[0].clientX;
    },
    [isDragging, window, xMax]
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

  const handleMouseUp = useCallback(() => {
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
