import React, {FC} from "react";
import {useBootstrap} from "@app/hooks";

/**
 * Компонент-обёртка для инициализации приложения.
 *
 * ### Основные задачи:
 * - Вызывает хук {@link useBootstrap}, который отвечает за начальную инициализацию приложения
 *   (например, загрузку конфигурации, установку локальных данных, запуск подписок и т.п.).
 * - Оборачивает дочерние элементы и возвращает их без изменений.
 *
 * ### Когда использовать:
 * Используется как корневой провайдер, чтобы гарантировать,
 * что инициализационные действия выполняются при старте приложения.
 *
 * @component
 * @example
 * ```tsx
 * import React from "react";
 * import ReactDOM from "react-dom/client";
 * import App from "./App";
 * import AppProviders from "@app/providers/app-providers";
 *
 * const root = ReactDOM.createRoot(document.getElementById("root")!);
 * root.render(
 *   <AppProviders>
 *     <App />
 *   </AppProviders>
 * );
 * ```
 */
const AppProviders: FC<{ children: React.ReactNode }> = ({children}) => {
  // Выполняем начальную инициализацию приложения
  useBootstrap();

  return (
    <>
      {children}
    </>
  );
};

export default AppProviders;
