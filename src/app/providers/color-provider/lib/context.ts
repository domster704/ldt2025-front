import {createContext} from "react";
import {CTGStatus} from "@shared/const/ctgColors";

export interface IColorContext {
  status: CTGStatus;
  color: {
    hex: string;
    rgb: string;
  };
}

export const ColorContext = createContext<IColorContext | null>(null)