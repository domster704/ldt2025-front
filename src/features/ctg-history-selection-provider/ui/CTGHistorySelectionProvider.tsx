import React, {FC, useCallback, useState} from 'react';
import {CTGHistorySelectionContext} from "../lib/context";

interface CTGHistorySelectionProviderProps {
  children: React.ReactNode;
}

export const CTGHistorySelectionProvider: FC<CTGHistorySelectionProviderProps> = ({children}) => {
  const [selected, setSelected] = useState<number[]>([1]);

  const toggle = useCallback((id: number) => {
    setSelected(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }

      if (prev.length >= 2) {
        return [prev[prev.length - 1], id];
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
