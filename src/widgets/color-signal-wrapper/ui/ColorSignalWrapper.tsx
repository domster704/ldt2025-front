import React, {FC} from "react";

import * as style from './ColorSignalWrapper.module.css';

interface IndicatorWrapperProps {
  /** Дочерние элементы, которые будут обёрнуты в контейнер */
  children: React.ReactNode;
}

/**
 * **ColorSignalWrapper** — визуальная обёртка для контента,
 * обеспечивающая применение CSS-классов для цветовой индикации.
 *
 * ---
 * ### Основные задачи:
 * - Оборачивает вложенные элементы (`children`) в контейнер с классом `indicatorWrapper`.
 * - Используется совместно с {@link ColorProvider}, чтобы визуально отображать
 *   текущий статус КТГ или другой цветовой контекст.
 * - Позволяет централизованно менять оформление цветовых индикаторов через CSS.
 *
 * ---
 * ### Когда использовать:
 * - Для оборачивания блоков, где необходимо применение общей цветовой темы или индикатора.
 * - Чаще всего используется в лэйаутах страниц (`CTGStatusPage`, `CTGContextPage`).
 *
 * ---
 * ### Пример:
 * ```tsx
 * import ColorSignalWrapper from "@widgets/color-signal-wrapper";
 *
 * const Page = () => (
 *   <ColorSignalWrapper>
 *     <h1>Контент с цветовой индикацией</h1>
 *   </ColorSignalWrapper>
 * );
 * ```
 */
const ColorSignalWrapper: FC<IndicatorWrapperProps> = ({children}) => {
  return (
    <div className={style.indicatorWrapper}>
      {children}
    </div>
  )
}

export default ColorSignalWrapper;
