import React, {FC, ReactNode} from "react";
import {ColorContext} from "@shared/providers/color-provider/lib/context";
import {RootState, useAppSelector} from "@app/store/store";
import {ColorHealthStatus, colors} from "@shared/providers/color-provider/model/types";


interface ColorProviderProps {
  children: ReactNode;
}

export const ColorProvider: FC<ColorProviderProps> = ({children}) => {
  const status = useAppSelector((state: RootState) => state.sessionStream.status);
  const current = colors[status] ?? colors[ColorHealthStatus.GOOD];

  return (
    <ColorContext.Provider value={{status, color: current}}>
      <div style={{
        "--indicator-color": current.hex,
        "--indicator-color-rgb": current.rgb,
      }}>
        {children}
      </div>
    </ColorContext.Provider>
  );
};

export default ColorProvider;