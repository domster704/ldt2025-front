import React, {FC} from "react";
import {useBootstrap} from "@app/hooks";

const AppProviders: FC<{ children: React.ReactNode }> = ({children}) => {
  useBootstrap();

  return (
    <>
      {children}
    </>
  );
};

export default AppProviders;
