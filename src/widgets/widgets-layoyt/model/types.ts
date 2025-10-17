import React from "react";

export interface Widget {
  /** Уникальный ID виджета */
  id: string;

  /** JSX-компонент, который нужно отрендерить */
  element: React.ReactNode;

  /** Позиция и размеры в сетке */
  layout: {
    x: number;
    y: number;
    w: number;
    h: number;
    static?: boolean;
  };
}
