import React, {FC} from 'react';
import * as style from './ContainerWithLabel.module.css'

/**
 * Позиционирование подписи (`label`) относительно содержимого контейнера.
 *
 * - `LEFT` — подпись слева от содержимого.
 * - `RIGHT` — подпись справа от содержимого.
 */
export enum LabelPosition {
  LEFT = 'left',
  RIGHT = 'right'
}

interface ContainerWithLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Расположение подписи относительно содержимого (по умолчанию `LEFT`) */
  labelPosition?: LabelPosition;
  /** Текст подписи */
  label: string;
  /** Дочерние элементы, которые будут обёрнуты в контейнер */
  children: React.ReactNode;
}

/**
 * Универсальный контейнер с подписью (label).
 *
 * ---
 * ### Особенности:
 * - Добавляет подпись (`label`) к любому блоку содержимого.
 * - Поддерживает позиционирование подписи слева (`LEFT`) или справа (`RIGHT`).
 * - Принимает любые стандартные `HTMLDivElement`-props (например, `className`, `style`).
 *
 * ---
 * ### Использование:
 * Используется для группировки элементов с подписью:
 * - таблицы параметров,
 * - графики,
 * - панели настроек и т.д.
 *
 * ---
 * @component
 * @example
 * ```tsx
 * import ContainerWithLabel, {LabelPosition} from "@shared/ui/container-with-label";
 *
 * const Example = () => (
 *   <ContainerWithLabel label="Заголовок" labelPosition={LabelPosition.LEFT}>
 *     <p>Контент внутри контейнера</p>
 *   </ContainerWithLabel>
 * );
 *
 * const ExampleRight = () => (
 *   <ContainerWithLabel label="Дата" labelPosition={LabelPosition.RIGHT}>
 *     <input type="date" />
 *   </ContainerWithLabel>
 * );
 * ```
 */
const ContainerWithLabel: FC<ContainerWithLabelProps> = ({
                                                           labelPosition = LabelPosition.LEFT,
                                                           children,
                                                           label,
                                                           ...props
                                                         }) => {
  return (
    <div {...props} className={[
      style.containerWithLabel,
      props.className || '',
    ].join(' ')}>
      <span className={[
        style.containerWithLabel__label,
        style[labelPosition]
      ].join(' ')}>{label}</span>
      {children}
    </div>
  );
}

export default ContainerWithLabel;
