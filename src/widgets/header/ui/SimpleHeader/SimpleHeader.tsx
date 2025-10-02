import React, {FC} from 'react';
import * as style from './SimpleHeader.module.css'

interface SimpleHeaderProps {
  /** Текст заголовка, который будет отображён в шапке */
  headerText: string;
}

/**
 * **SimpleHeader** — простой заголовок страницы.
 *
 * ---
 * ### Основные задачи:
 * - Отображает переданный текст заголовка (`headerText`) внутри тега `<h2>`.
 * - Используется на страницах, где не требуется расширенная информация,
 *   в отличие от {@link HeaderGraph}.
 *
 * ---
 * ### Визуальная структура:
 * ```
 * <header>
 *   <h2>Заголовок</h2>
 * </header>
 * ```
 *
 * ---
 * ### Пример использования:
 * ```tsx
 * import SimpleHeader from "@widgets/header/ui/SimpleHeader";
 *
 * const SettingsPage = () => (
 *   <SimpleHeader headerText="Настройки" />
 * );
 *
 * const HistoryPage = () => (
 *   <SimpleHeader headerText="История КТГ" />
 * );
 * ```
 */
const SimpleHeader: FC<SimpleHeaderProps> = ({headerText}) => {
  return (
    <header className={style.header}>
      <h2>{headerText}</h2>
    </header>
  );
};

export default SimpleHeader;
