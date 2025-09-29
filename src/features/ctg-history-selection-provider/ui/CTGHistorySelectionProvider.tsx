import React, {FC, useCallback, useState} from 'react';
import {CTGHistorySelectionContext} from "../lib/context";

interface CTGHistorySelectionProviderProps {
  children: React.ReactNode;
}

export const CTGHistorySelectionProvider: FC<CTGHistorySelectionProviderProps> = ({children}) => {
  const [selected, setSelected] = useState<number[]>([]);

  const toggle = useCallback((id: number) => {
    setSelected(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }

      if (prev.length >= 2) {
        return [prev[prev.length - 1], id]; // или сбросить на [id], зависит от UX
      }
      return [...prev, id];
    });
  }, []);

  const clear = useCallback(() => setSelected([]), []);

  return (
    <CTGHistorySelectionContext.Provider value={{selected, toggle, clear}}>
      {children}
    </CTGHistorySelectionContext.Provider>
  );
};

export default CTGHistorySelectionProvider;
