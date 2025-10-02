import React, {FC} from "react";
import {RouterProvider} from "react-router-dom";
import AppProviders from "./providers/AppProviders";
import {router} from "@app/routes/router";

/**
 * Корневой компонент приложения.
 *
 * ### Основные задачи:
 * - Оборачивает всё приложение в {@link AppProviders}, который выполняет инициализацию
 *   и предоставляет глобальные контексты.
 * - Подключает роутинг через {@link RouterProvider}, используя преднастроенный {@link router}.
 *
 * ### Структура:
 * ```
 * <AppProviders>
 *   <RouterProvider router={router} />
 * </AppProviders>
 * ```
 *
 * ### Когда использовать:
 * Используется только один раз — в `index.tsx`, где рендерится в DOM.
 *
 * @component
 * @example
 * ```tsx
 * import ReactDOM from "react-dom/client";
 * import App from "./App";
 *
 * const root = ReactDOM.createRoot(document.getElementById("root")!);
 * root.render(<App />);
 * ```
 */
const App: FC = () => {
  return (
    <AppProviders>
      <RouterProvider router={router}/>
    </AppProviders>
  );
};

export default App;
