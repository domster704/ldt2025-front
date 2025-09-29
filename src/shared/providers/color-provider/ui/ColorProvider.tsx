import React, {FC, ReactNode} from "react";
import {ColorContext} from "@shared/providers/color-provider/lib/context";
import {RootState, useAppSelector} from "@app/store/store";
import {ColorHealthStatus} from "@shared/providers/color-provider/model/types";
import {selectGoodColor, selectWarningColor} from "@entities/settings/model/selectors";
import {hexToRgb} from "@shared/lib/utils/convertHEXToRGB";


interface ColorProviderProps {
  children: ReactNode;
}


export const ColorProvider: FC<ColorProviderProps> = ({children}) => {
  const status = useAppSelector((state: RootState) => state.sessionStream.status);
  const chosenWarningColor = useAppSelector(selectWarningColor);
  const chosenGoodColor = useAppSelector(selectGoodColor);

  const current = status === ColorHealthStatus.Warning ? chosenWarningColor : chosenGoodColor;
  const currentRGB = hexToRgb(current);

  return (
    <ColorContext.Provider value={{
      status, color: {
        hex: current,
        rgb: currentRGB
      }
    }}>
      <div style={{
        "--indicator-color": current,
        "--indicator-color-rgb": currentRGB,
        height: "100%"
      }}>
        {children}
      </div>
    </ColorContext.Provider>
  );
};

export default ColorProvider;