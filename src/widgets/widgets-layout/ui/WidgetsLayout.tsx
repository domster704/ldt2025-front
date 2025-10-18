import React, {useEffect, useRef, useState} from "react";
import GridLayout, {Layout} from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import * as style from "./WidgetsLayout.module.css";
import {Widget} from "../model/types";
import {useResizeObserver} from "@shared/lib/hooks/useResizeObserver";
import {useAppSelector} from "@app/store/store";
import {selectIsWidgetLayoutEdit} from "@entities/global/model/selectors";

const GRID_COLS = 48;
const GRID_ROWS = 48;

interface WidgetsLayoutProps {
  widgets: Widget[];
  cols?: number;
  rows?: number;
  storageKey?: string;
}

const margin: [number, number] = [4, 4];
const containerPadding: [number, number] = [0, 0];

/**
 * Универсальный шаблон виджетов.
 * - Делится на GRID_ROWS x GRID_COLS.
 * - Поддерживает редактирование и сохранение layout.
 */
const WidgetsLayout: React.FC<WidgetsLayoutProps> = ({
                                                       widgets,
                                                       cols = GRID_COLS,
                                                       rows = GRID_ROWS,
                                                       storageKey
                                                     }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {width, height} = useResizeObserver(containerRef);
  const isWidgetsLayoutEdit = useAppSelector(selectIsWidgetLayoutEdit);

  const [layout, setLayout] = useState<Layout[]>(
    widgets.map((w) => ({i: w.id, ...w.layout}))
  );

  const rowHeight =
    rows > 0
      ? (height - containerPadding[1] * 2 - (rows - 1) * margin[1]) / rows
      : 0;

  useEffect(() => {
    if (!storageKey) {
      return;
    }
    const saved = localStorage.getItem(storageKey);

    if (!saved) {
      return;
    }

    try {
      setLayout(JSON.parse(saved));
    } catch {
      console.warn("Layout восстановить не удалось");
    }
  }, [storageKey]);

  const handleLayoutChange = (newLayout: Layout[]) => {
    setLayout(newLayout);
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(newLayout));
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.layoutContainer} ref={containerRef}>
        {width > 0 && height > 0 && (
          <GridLayout layout={layout}
                      cols={cols}
                      width={width}
                      rowHeight={rowHeight}
                      maxRows={GRID_ROWS}
                      isDraggable={isWidgetsLayoutEdit}
                      isResizable={isWidgetsLayoutEdit}
                      preventCollision={true}
                      resizeHandles={['se', 'sw', 'ne', 'nw']}
                      compactType={null}
                      autoSize={false}
                      margin={margin}
                      containerPadding={containerPadding}
                      onDragStop={handleLayoutChange}
                      onResizeStop={handleLayoutChange}>
            {
              widgets.map((w) => (
                <div key={w.id} data-grid={layout.find((l) => l.i === w.id)}>
                  <div className={style.widget}>
                    {w.element}
                  </div>
                </div>
              ))
            }
          </GridLayout>
        )}
      </div>
    </div>
  );
};

export default WidgetsLayout;
