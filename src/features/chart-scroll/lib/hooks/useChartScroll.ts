import React, {useCallback, useRef, useState} from "react";

export function useChartScroll({window_, xMax}: { window_: number; xMax: number }) {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<number | null>(null);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    const step = 1;
    setScrollOffset((prevOffset) => (e.deltaY > 0 ? prevOffset + step : Math.max(0, prevOffset - step)));
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
