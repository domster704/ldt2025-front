import React, {useEffect, useState} from "react";

export function useResizeObserver<T extends Element>(ref: React.RefObject<T | null>) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(() => {
      if (ref.current) {
        setWidth(ref.current.getBoundingClientRect().width);
      }
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return width;
}
