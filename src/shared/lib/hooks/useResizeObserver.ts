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
