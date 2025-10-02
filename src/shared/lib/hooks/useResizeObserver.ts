import React, {useEffect, useState} from "react";

/**
 * Хук для отслеживания размеров элемента с помощью `ResizeObserver`.
 *
 * ---
 * ### Назначение:
 * - Позволяет автоматически получать актуальную ширину и высоту DOM-элемента.
 * - Удобно использовать для графиков, адаптивных контейнеров и любых компонентов,
 *   где важен **responsive-дизайн**.
 *
 * ---
 * ### Логика работы:
 * 1. При монтировании создаётся `ResizeObserver`, который следит за элементом `ref.current`.
 * 2. При каждом изменении размеров вызывается `updateSize`, обновляющий состояние.
 * 3. При размонтировании — наблюдатель отключается.
 *
 * ---
 * @param ref React-ссылка на HTML-элемент, за которым нужно следить.
 * @returns Объект `{ width, height }` с актуальными размерами элемента.
 *
 * ---
 * @example
 * ```tsx
 * import React, {useRef} from "react";
 * import {useResizeObserver} from "@shared/lib/hooks/useResizeObserver";
 *
 * const ResizableBox = () => {
 *   const ref = useRef<HTMLDivElement | null>(null);
 *   const {width, height} = useResizeObserver(ref);
 *
 *   return (
 *     <div ref={ref} style={{resize: "both", overflow: "auto", border: "1px solid black"}}>
 *       <p>Ширина: {width}px</p>
 *       <p>Высота: {height}px</p>
 *     </div>
 *   );
 * };
 * ```
 */
export function useResizeObserver<T extends Element>(ref: React.RefObject<T | null>) {
  const [size, setSize] = useState({width: 0, height: 0});

  useEffect(() => {
    if (!ref.current) return;

    const updateSize = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setSize({width: rect.width, height: rect.height});
      }
    };

    const observer = new ResizeObserver(updateSize);
    observer.observe(ref.current);

    updateSize();

    return () => observer.disconnect();
  }, [ref]);

  return size;
}
