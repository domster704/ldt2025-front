import {createContext} from "react";
import {ColorHealthStatus} from "@app/providers/color-provider/model/types";

export interface IColorContext {
  status: ColorHealthStatus;
  color: {
    hex: string;
    rgb: string;
  };
}

export const ColorContext = createContext<IColorContext | null>(null)