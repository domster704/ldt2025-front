import {createHashRouter, RouteObject,} from "react-router-dom";
import RootLayout from "./RootLayout";
import React from "react";
import {HISTORY_PAGE_URL, HOME_PAGE_URL, PATIENT_PICKER_PAGE_URL, SETTINGS_PAGE_URL} from "@shared/const/constants";

const HomePageLazy = React.lazy(() => import('@pages/home'));
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
          path: HOME_PAGE_URL,
          element: <HomePageLazy/>,
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
          element: <HomePageLazy/>,
        },
      ],
    },
  ]
;

export const router = createHashRouter(routes);
