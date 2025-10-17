import React, {useEffect, useRef, useState} from "react";
import GridLayout, {Layout} from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import * as style from "./WidgetsLayout.module.css";
import {Widget} from "../model/types";
import {useResizeObserver} from "@shared/lib/hooks/useResizeObserver";

const GRID_COLS = 48;
const GRID_ROWS = 48;

interface WidgetsLayoutProps {
  widgets: Widget[];
  cols?: number;
  rows?: number;
  storageKey?: string;
  defaultEditable?: boolean;
}

/**
 * Универсальный шаблон виджетов.
 * - Делится на GRID_ROWS x GRID_COLS.
 * - Поддерживает редактирование и сохранение layout.
 */
const WidgetsLayout: React.FC<WidgetsLayoutProps> = ({
                                                       widgets,
                                                       cols = GRID_COLS,
                                                       rows = GRID_ROWS,
                                                       storageKey,
                                                       defaultEditable = false,
                                                     }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {width, height} = useResizeObserver(containerRef);

  const [layout, setLayout] = useState<Layout[]>(
    widgets.map((w) => ({i: w.id, ...w.layout}))
  );
  const [editMode, setEditMode] = useState(defaultEditable);

  // const rowHeight = height ? Math.floor(height / rows) : 100;
  const rowHeight = height / rows;
  const gridHeight = rowHeight * rows;

  useEffect(() => {
    if (!storageKey) return;
    const saved = localStorage.getItem(storageKey);
    if (!saved) return;
    try {
      setLayout(JSON.parse(saved));
    } catch {
      console.warn("Layout восстановить не удалось");
    }
  }, [storageKey]);

  const handleLayoutChange = (newLayout: Layout[]) => {
    setLayout(newLayout);
    if (storageKey) {
      // localStorage.setItem(storageKey, JSON.stringify(newLayout));
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.toolbar}>
        <button onClick={() => setEditMode((v) => !v)}>
          {editMode ? "Зафиксировать" : "Редактировать"}
        </button>
      </div>

      <div className={style.layoutContainer} ref={containerRef}>
        {width > 0 && height > 0 && (
          <GridLayout layout={layout}
                      cols={GRID_COLS}
                      width={width}
                      rowHeight={rowHeight}
                      maxRows={GRID_ROWS}
                      isDraggable={editMode}
                      isResizable={editMode}
                      preventCollision={true}
                      isBounded={true}
                      compactType={null}
                      autoSize={false}
                      margin={[0, 0]}
                      containerPadding={[0, 0]}>
            {widgets.map((w) => (
              <div key={w.id} data-grid={layout.find((l) => l.i === w.id)}>
                <div className={style.widget}>
                  {w.element}
                </div>
              </div>
            ))}
          </GridLayout>
        )}
      </div>
    </div>
  );
};

export default WidgetsLayout;
