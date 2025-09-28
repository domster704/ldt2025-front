import {useContext} from "react";
import {ColorContext} from "@shared/providers/color-provider/lib/context";

export function useColorsStatus() {
  const ctx = useContext(ColorContext);
  if (!ctx) {
    throw new Error("useColors must be used within ColorProvider");
  }
  return ctx;
}