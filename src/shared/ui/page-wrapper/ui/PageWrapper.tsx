import React, {FC} from 'react';
import * as style from './PageWrapper.module.css'

interface PageWrapperProps {
  /** Дочерние элементы, которые будут отрисованы внутри обёртки */
  children: React.ReactNode;
}

/**
 * Базовый контейнер-обёртка для страниц приложения.
 *
 * ---
 * ### Назначение:
 * - Централизует и задаёт единый стиль для всех страниц (например, отступы, фон, сетку).
 * - Используется как корневой контейнер в компонентах страниц (`Settings`, `History`, `PatientPicker` и т.д.).
 *
 * ---
 * ### Структура:
 * ```
 * <div className="wrapper">
 *   {children}
 * </div>
 * ```
 *
 * ---
 * ### Использование:
 * @example
 * ```tsx
 * import PageWrapper from "@shared/ui/page-wrapper";
 *
 * const ExamplePage = () => (
 *   <PageWrapper>
 *     <h1>Заголовок страницы</h1>
 *     <p>Контент страницы</p>
 *   </PageWrapper>
 * );
 * ```
 */
const PageWrapper: FC<PageWrapperProps> = ({children}) => {
  return (
    <div className={style.wrapper}>
      {children}
    </div>
  );
}

export default PageWrapper;
