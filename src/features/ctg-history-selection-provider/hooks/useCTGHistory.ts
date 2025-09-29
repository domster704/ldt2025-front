import {useContext} from "react";
import {CTGHistorySelectionContext} from "@features/ctg-history-selection-provider/lib/context";

export function useCTGHistory() {
  const ctx = useContext(CTGHistorySelectionContext);
  if (!ctx) {
    throw new Error("useCTGHistory must be used within CTGHistorySelectionProvider");
  }
  return ctx;
}