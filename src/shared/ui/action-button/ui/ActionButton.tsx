import React, {FC} from 'react';
import * as style from './ActionButton.module.css'

/**
 * Варианты выравнивания содержимого кнопки.
 *
 * - `Vertical` — иконка сверху, текст снизу (по умолчанию).
 * - `Horizontal` — иконка слева, текст справа (в строку).
 */
export enum ActionButtonAlignment {
  Vertical = 'vertical',
  Horizontal = 'horizontal'
}

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Путь к иконке (SVG/PNG), отображается внутри кнопки */
  icon?: string;
  /** Выравнивание содержимого кнопки (по умолчанию `Vertical`) */
  alignment?: ActionButtonAlignment;
  /** Текст, отображаемый рядом с иконкой */
  text?: string;
}

/**
 * Универсальная кнопка с иконкой и текстом.
 *
 * ---
 * ### Особенности:
 * - Принимает любые стандартные HTML-свойства кнопки (`onClick`, `disabled` и т.п.).
 * - Поддерживает выравнивание в **вертикальном** и **горизонтальном** виде.
 * - Может содержать только иконку, только текст или оба элемента.
 *
 * ---
 * @component
 * @example
 * ```tsx
 * import ActionButton, {ActionButtonAlignment} from "@shared/ui/action-button";
 * import playIcon from "@shared/assets/img/play.svg";
 *
 * // Вертикальная кнопка (иконка сверху, текст снизу)
 * <ActionButton
 *   icon={playIcon}
 *   text="Старт"
 *   onClick={() => console.log("Clicked!")}
 * />
 *
 * // Горизонтальная кнопка (иконка слева, текст справа)
 * <ActionButton
 *   icon={playIcon}
 *   text="Играть"
 *   alignment={ActionButtonAlignment.Horizontal}
 * />
 *
 * // Кнопка только с иконкой
 * <ActionButton icon={playIcon} />
 *
 * // Кнопка только с текстом
 * <ActionButton text="Назад" />
 * ```
 */
const ActionButton: FC<ActionButtonProps> = ({
                                               icon,
                                               alignment = ActionButtonAlignment.Vertical,
                                               text,
                                               ...props
                                             }) => {
  return (
    <button {...props} className={[
      style.actionButton,
      alignment ? style[alignment] : '',
      props.className || ''
    ].join(' ')}>
      {icon && (
        <img className={style.actionButton__img}
             src={icon}
             alt={""}/>
      )}
      {text && (
        <span className={style.actionButton__text}>
          {text}
        </span>
      )}
    </button>
  );
}

export default ActionButton;
