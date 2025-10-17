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
 */
const App: FC = () => {
  return (
    <AppProviders>
      <RouterProvider router={router}/>
    </AppProviders>
  );
};

export default App;
