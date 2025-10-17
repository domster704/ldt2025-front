import React, {FC, useCallback, useState} from 'react';
import {CTGHistorySelectionContext} from "../lib/context";

interface CTGHistorySelectionProviderProps {
  /** Дочерние элементы, которые получат доступ к контексту выбора истории КТГ */
  children: React.ReactNode;
}

/**
 * Провайдер контекста выбора записей истории КТГ.
 *
 * ### Назначение:
 * Управляет выбором 0–2 записей истории КТГ для отображения:
 * - 0 записей → режим графиков (charts).
 * - 1 запись → просмотр параметров одного исследования.
 * - 2 записи → режим сравнения.
 *
 * ### Логика выбора:
 * - Если элемент уже выбран → он снимается.
 * - Если выбран один элемент → добавляется второй.
 * - Если выбрано два элемента → сохраняется последний + новый.
 *
 * ### Контекст:
 * В {@link CTGHistorySelectionContext} передаются:
 * - `selected: number[]` — массив выбранных ID.
 * - `toggle(id: number)` — переключение элемента.
 * - `clear()` — очистка выбора.
 *
 */
export const CTGHistorySelectionProvider: FC<CTGHistorySelectionProviderProps> = ({children}) => {
  const [selected, setSelected] = useState<number[]>([]);

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
