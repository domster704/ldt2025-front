import React, {useEffect, useState} from "react";


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