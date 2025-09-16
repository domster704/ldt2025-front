import React, {FC} from "react";
import {RouterProvider} from "react-router-dom";
import AppProviders from "./providers/AppProviders";
import {router} from "@app/routes/router";

const App: FC = () => {
  return (
    <AppProviders>
      <RouterProvider router={router}/>
    </AppProviders>
  );
};

export default App;
