import React, {FC} from 'react';
import ActionButton from "@shared/ui/action-button";
import {Link} from "react-router-dom";
import {APP_URL} from "@shared/const/constants";

import * as style from './OpenPageButton.module.css';

interface SettingsButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Страница, на которую нужно перейти (если `null`, кнопка будет обычной). */
  page: APP_URL | null;

  /** Путь к иконке (SVG/PNG), отображаемой в кнопке. */
  icon: string;

  /** Текст рядом с иконкой (опционально). */
  text?: string;
}

/**
 * Кнопка для перехода на другую страницу приложения.
 *
 * ---
 * ### Особенности:
 * - Если передан `page`, оборачивается в {@link Link} из `react-router-dom` и работает как навигационная ссылка.
 * - Если `page === null`, работает как обычная кнопка (`<button>`), используя компонент {@link ActionButton}.
 * - Поддерживает все стандартные HTML-свойства кнопки (`onClick`, `disabled` и т.д.).
 *
 * ---
 * ### Использование:
 * @example
 * ```tsx
 * import OpenPageButton from "@shared/ui/open-page-button";
 * import {SETTINGS_PAGE_URL} from "@shared/const/constants";
 * import settingsIcon from "@shared/assets/img/settings.svg";
 *
 * // Навигационная кнопка
 * <OpenPageButton
 *   page={SETTINGS_PAGE_URL}
 *   icon={settingsIcon}
 *   text="Настройки"
 * />
 *
 * // Обычная кнопка (без перехода по маршруту)
 * <OpenPageButton
 *   page={null}
 *   icon={settingsIcon}
 *   text="Обновить"
 *   onClick={() => console.log("Клик!")}
 * />
 * ```
 */
const OpenPageButton: FC<SettingsButtonProps> = ({
                                                   page,
                                                   icon,
                                                   text,
                                                   ...props
                                                 }) => {
  if (!page) {
    return (
      <ActionButton {...props}
                    icon={icon}
                    text={text}/>
    );
  }
  return (
    <Link to={page} className={style.buttonLink}>
      <ActionButton {...props}
                    icon={icon}
                    text={text}/>
    </Link>
  );
}

export default OpenPageButton;
