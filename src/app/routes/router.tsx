import {createHashRouter, RouteObject,} from "react-router-dom";
import RootLayout from "./RootLayout";
import React from "react";
import {
  CONTEXT_PAGE_URL,
  HISTORY_PAGE_URL,
  PATIENT_PICKER_PAGE_URL,
  SETTINGS_PAGE_URL,
  STATUS_PAGE_URL
} from "@shared/const/constants";

// const HomePageLazy = React.lazy(() => import('@pages/home'));
const CTGStatusPageLazy = React.lazy(() => import('@pages/ctg-status-page'));
const CTGContextPagePageLazy = React.lazy(() => import('@pages/ctg-context-page'));
const SettingsPageLazy = React.lazy(() => import('@pages/settings'));
const HistoryPageLazy = React.lazy(() => import('@pages/history'));
const PatientPickerPageLazy = React.lazy(() => import('@pages/patient-picker'));

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
  ]
;

export const router = createHashRouter(routes);
