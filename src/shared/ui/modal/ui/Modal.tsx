import React, {FC} from "react";
import * as style from "./Modal.module.css";
import {createPortal} from "react-dom";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Флаг открытия модального окна */
  isOpen: boolean;

  /** Коллбэк, вызываемый при закрытии (например, по клику на оверлей или кнопку ×) */
  onClose: () => void;

  /** Содержимое модального окна */
  children: React.ReactNode;
}

/**
 * Компонент модального окна.
 *
 * ---
 * ### Возможности:
 * - Отображает модальное окно с затемнённым оверлеем.
 * - Закрывается:
 *   - при клике по фону (оверлею),
 *   - при клике на кнопку "×".
 * - Блокирует всплытие клика внутри модального содержимого.
 * - Поддерживает передачу дополнительных HTML-атрибутов для контейнера.
 *
 * ---
 * ### Структура:
 * ```
 * +-----------------------------------+
 * | overlay (клик = закрыть)          |
 * |   +---------------------------+   |
 * |   | content                   |   |
 * |   |  [ × ]  children          |   |
 * |   +---------------------------+   |
 * +-----------------------------------+
 * ```
 */
const Modal: FC<ModalProps> = ({
                                 isOpen,
                                 onClose,
                                 children,
                                 ...props
                               }) => {
  if (!isOpen) return null;

  const modalContent = (
    <div className={style.overlay} onClick={onClose}>
      <div {...props} className={[
        style.content,
        props.className || ''
      ].join(' ')}
           onClick={e => e.stopPropagation()}>
        <button className={style.close} onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default Modal;
