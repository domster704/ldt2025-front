import {createHashRouter, RouteObject} from "react-router-dom";
import RootLayout from "./RootLayout";
import React from "react";
import {
  CONTEXT_PAGE_URL,
  HISTORY_PAGE_URL,
  PATIENT_PICKER_PAGE_URL,
  SETTINGS_PAGE_URL,
  STATUS_PAGE_URL
} from "@shared/const/constants";

const CTGStatusPageLazy = React.lazy(() => import('@pages/ctg-status-page'));
const CTGContextPagePageLazy = React.lazy(() => import('@pages/ctg-context-page'));
const SettingsPageLazy = React.lazy(() => import('@pages/settings'));
const HistoryPageLazy = React.lazy(() => import('@pages/history'));
const PatientPickerPageLazy = React.lazy(() => import('@pages/patient-picker'));

/**
 * Массив конфигураций маршрутов приложения.
 *
 * ### Основная структура:
 * - Корневой путь (`/`) использует {@link RootLayout} как общий layout.
 * - Вложенные маршруты загружаются лениво (`React.lazy`) для оптимизации.
 * - Поддерживается fallback на главную страницу (CTGStatusPage), если путь не найден.
 *
 * ### Список маршрутов:
 * - `/` (index) → {@link CTGStatusPageLazy} — страница мониторинга статуса.
 * - `/status` → {@link CTGStatusPageLazy}.
 * - `/context` → {@link CTGContextPagePageLazy}.
 * - `/settings` → {@link SettingsPageLazy}.
 * - `/history` → {@link HistoryPageLazy}.
 * - `/patient-picker` → {@link PatientPickerPageLazy}.
 * - `*` (любой неизвестный путь) → редирект на {@link CTGStatusPageLazy}.
 *
 * @see RootLayout
 * @see createHashRouter
 */
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout/>,
    children: [
      {
        index: true,
        element: <CTGStatusPageLazy/>,
      },
      {
        path: STATUS_PAGE_URL,
        element: <CTGStatusPageLazy/>,
      },
      {
        path: CONTEXT_PAGE_URL,
        element: <CTGContextPagePageLazy/>,
      },
      {
        path: SETTINGS_PAGE_URL,
        element: <SettingsPageLazy/>,
      },
      {
        path: HISTORY_PAGE_URL,
        element: <HistoryPageLazy/>,
      },
      {
        path: PATIENT_PICKER_PAGE_URL,
        element: <PatientPickerPageLazy/>,
      },
      {
        path: "*",
        element: <CTGStatusPageLazy/>,
      },
    ],
  },
];

/**
 * Конфигурированный экземпляр роутера.
 *
 * Используется внутри {@link RouterProvider} в `App.tsx`.
 *
 * @example
 * ```tsx
 * import {RouterProvider} from "react-router-dom";
 * import {router} from "@app/routes/router";
 *
 * const App = () => <RouterProvider router={router} />;
 * ```
 */
export const router = createHashRouter(routes);
