import {useAppDispatch} from "@app/store/store";
import {useEffect} from "react";
import {setInitialColors} from "@entities/settings/model/settingsSlice";
import {setInitialSounds} from "@entities/sound/model/soundSlice";
import {fetchAllPatient} from "@entities/patient/api/patientThunk";
import {fetchAllCTGHistory} from "@entities/ctg-history/api/ctgHistoryThunk";

/**
 * Хук для начальной инициализации приложения.
 *
 * ### Основные задачи:
 * - Загружает список пациентов из API через thunk {@link fetchAllPatient}.
 * - Восстанавливает настройки цвета (норма / предупреждение) из `localStorage`
 *   и диспатчит их в Redux с помощью {@link setInitialColors}.
 * - Восстанавливает состояние звуковых сигналов из `localStorage`
 *   и диспатчит его в Redux с помощью {@link setInitialSounds}.
 *
 * ### Логика работы:
 * - При монтировании компонента, где используется хук:
 *   1. Запускается асинхронная загрузка всех пациентов.
 *   2. Извлекаются значения `"goodColor"` и `"warningColor"` из `localStorage`.
 *   3. Извлекается JSON `"soundsState"` из `localStorage` (если есть).
 *   4. Все значения применяются к Redux store.
 *
 * ### Когда использовать:
 * Хук вызывается один раз на уровне корневого компонента {@link AppProviders},
 * чтобы гарантировать, что глобальные данные и настройки подгружаются при старте приложения.
 *
 * @example
 * ```tsx
 * import React from "react";
 * import {useBootstrap} from "@app/hooks";
 *
 * const AppProviders: React.FC<{children: React.ReactNode}> = ({children}) => {
 *   // Запускаем инициализацию при старте приложения
 *   useBootstrap();
 *
 *   return <>{children}</>;
 * };
 * ```
 */
export function useBootstrap() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    function initColors() {
      const goodColor = localStorage.getItem("goodColor");
      const warningColor = localStorage.getItem("warningColor");

      dispatch(setInitialColors({
        goodColor: goodColor || undefined,
        warningColor: warningColor || undefined
      }));
    }

    function initSounds() {
      const raw = localStorage.getItem("soundsState");
      if (raw) {
        dispatch(setInitialSounds(JSON.parse(raw)));
      }
    }

    async function init() {
      await dispatch(fetchAllPatient());
    }

    init().then();
    initColors();
    initSounds();
  }, [dispatch]);
}
