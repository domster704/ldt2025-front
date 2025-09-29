import {createContext} from "react";

export interface CTGHistorySelectionContextValue {
  selected: number[];
  toggle: (id: number) => void;
  clear: () => void;
}

export const CTGHistorySelectionContext = createContext<CTGHistorySelectionContextValue | null>(null);
