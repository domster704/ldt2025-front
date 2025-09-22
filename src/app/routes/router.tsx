import {createHashRouter, RouteObject,} from "react-router-dom";
import RootLayout from "./RootLayout";
import React from "react";
import {HOME_PAGE_URL} from "@shared/const/constants";

const HomePageLazy = React.lazy(() => import('@pages/Home'));

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
          path: "*",
          element: <HomePageLazy/>,
        },
      ],
    },
  ]
;

export const router = createHashRouter(routes);
