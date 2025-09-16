import {createHashRouter, RouteObject,} from "react-router-dom";
import RootLayout from "./RootLayout";
import React from "react";

const MainPageLazy = React.lazy(() => import('@pages/Main'));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout/>,
    children: [
      {
        index: true,
        element: <MainPageLazy/>,
      },
      {
        path: "*",
        element: <MainPageLazy/>,
      },
    ],
  },
];

export const router = createHashRouter(routes);
