import React, {FC} from "react";
import * as style from "./DashboardInContainer.module.css";
import ContainerWithLabel from "@shared/ui/container-with-label";
import {LabelPosition} from "@shared/ui/container-with-label/ui/ContainerWithLabel";
import {Dashboard} from "@widgets/dashboard";
import {StreamPoint} from "@entities/session-stream";

interface DashboardInContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Подпись для контейнера (обычно — дата или заголовок графика) */
  label: string;

  /** Данные частоты сердечных сокращений плода (FHR) */
  fhrData: StreamPoint[];

  /** Данные маточных сокращений (UC) */
  ucData: StreamPoint[];
  isUseClipPath?: boolean;
}

/**
 * **DashboardInContainer** — компонент-обёртка для {@link Dashboard},
 * который добавляет подпись (`label`) и оформление контейнера.
 *
 * ---
 * ### Основные задачи:
 * - Выводит графики FHR и UC внутри стилизованного блока.
 * - Добавляет подпись справа (`labelPosition = RIGHT`) — например, дату исследования.
 * - Устанавливает преднастроенные параметры:
 *   - `slideWindowTime = 10 * 60 * 3600` (окно отображения),
 *   - `maxPoints = 4000` (лимит точек на графике).
 * - Поддерживает проброс стандартных HTML-атрибутов `div` (`className`, `style` и др.).
 *
 * ---
 * ### Визуальная структура:
 * ```tsx
 * <ContainerWithLabel label="Дата">
 *   <Dashboard fhrData={...} ucData={...} />
 * </ContainerWithLabel>
 * ```
 *
 * ---
 * ### Пример использования:
 * ```tsx
 * import DashboardInContainer from "@widgets/dashboard/ui/DashboardInContainer";
 *
 * const Example = () => (
 *   <DashboardInContainer
 *     label="01.10.2025"
 *     fhrData={[
 *       {x: Date.now(), y: 140},
 *       {x: Date.now() + 1000, y: 138},
 *     ]}
 *     ucData={[
 *       {x: Date.now(), y: 20},
 *       {x: Date.now() + 1000, y: 25},
 *     ]}
 *   />
 * );
 * ```
 */
const DashboardInContainer: FC<DashboardInContainerProps> = ({
                                                               label,
                                                               fhrData,
                                                               ucData,
                                                               isUseClipPath,
                                                               ...props
                                                             }) => {
  return (
    <ContainerWithLabel
      {...props}
      className={[
        style.params__chartsContainer,
        props.className || ""
      ].join(" ")}
      labelPosition={LabelPosition.RIGHT}
      label={label}
    >
      <Dashboard
        className={style.params__dashboard}
        fhrData={fhrData}
        ucData={ucData}
        slideWindowTime={10 * 60 * 1000}
        maxPoints={4000}
        isUseClipPath={isUseClipPath}
      />
    </ContainerWithLabel>
  );
};

export default DashboardInContainer;
