import React, {FC} from "react";
import {RouterProvider} from "react-router-dom";
import AppProviders from "./providers/AppProviders";
import {router} from "@app/routes/router";
import {$wsApiUrl} from "@shared/const/constants";
import {WebsocketProvider} from "@app/providers/websocket-provider/ui/WebsocketProvider";
import {useAppSelector} from "@app/store/store";

/**
 * Корневой компонент приложения.
 *
 * ### Основные задачи:
 * - Оборачивает всё приложение в {@link AppProviders}, который выполняет инициализацию
 *   и предоставляет глобальные контексты.
 * - Подключает роутинг через {@link RouterProvider}, используя преднастроенный {@link router}.
 */
const App: FC = () => {
  const streaming = useAppSelector((s) => s.sessionStream.streaming);

  return (
    <AppProviders>
      <WebsocketProvider wsUrl={$wsApiUrl} enabled={streaming}>
        <RouterProvider router={router}/>
      </WebsocketProvider>
    </AppProviders>
  );
};

export default App;
