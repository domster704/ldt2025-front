import {configureStore, createSelector} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from "react-redux";
import globalSlice from "@entities/global/model/globalSlice";
import uploadSlice from "@entities/session-upload/model/uploadSlice";
import sessionStreamSlice from "@entities/session-stream/model/sessionStreamSlice";
import ctgHistorySlice from "@entities/ctg-history/model/ctgHistorySlice";
import patientSlice from "@entities/patient/model/patientSlice";
import settingsSlice from "@entities/settings/model/settingsSlice";
import soundsSlice from "@entities/sound/model/soundSlice";
import {soundListeners} from "@app/store/listeners/sound";

/**
 * Конфигурация глобального Redux-хранилища приложения.
 *
 * ### Включённые срезы состояния (slices):
 * - `global` — глобальные данные (например, текущая страница).
 * - `settings` — настройки пользователя (цвета, звуки и т.п.).
 * - `upload` — загрузка сессий мониторинга (архивы, сигналы).
 * - `sessionStream` — данные стриминга КТГ (FHR, UC, прогнозы).
 * - `ctgHistory` — история предыдущих КТГ-исследований.
 * - `patients` — список пациентов и выбранный пациент.
 * - `sound` — управление звуками (вкл/выкл, замена).
 *
 * ### Middleware:
 * - Базовые `redux-toolkit` middleware с включённой проверкой сериализуемости.
 * - Дополнительно подключается `soundListeners.middleware` для синхронизации состояния со `storage`.
 */
const store = configureStore({
  reducer: {
    global: globalSlice,
    settings: settingsSlice,
    upload: uploadSlice,
    sessionStream: sessionStreamSlice,
    ctgHistory: ctgHistorySlice,
    patients: patientSlice,
    sound: soundsSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: true})
      .prepend(soundListeners.middleware)
});

/**
 * Тип диспетчера приложения.
 *
 * Используется для типизации хука {@link useAppDispatch}.
 */
export type AppDispatch = typeof store.dispatch;

/**
 * Тип состояния приложения (корневой state).
 *
 * Используется для типизации {@link useAppSelector} и селекторов.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Хук для безопасного использования `dispatch`
 * с типизацией под {@link AppDispatch}.
 *
 * @example
 * ```tsx
 * const dispatch = useAppDispatch();
 * dispatch(setCurrentPage("/status"));
 * ```
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

/**
 * Хук для безопасного доступа к состоянию Redux
 * с типизацией под {@link RootState}.
 *
 * @example
 * ```tsx
 * const currentPage = useAppSelector(state => state.global.currentPage);
 * ```
 */
export const useAppSelector = useSelector.withTypes<RootState>();

/**
 * Утилита для создания мемоизированных селекторов
 * с типизацией `RootState`.
 *
 * Полезно для `createSelector` с reselect.
 *
 * @example
 * ```ts
 * export const selectCurrentPage = createAppSelector(
 *   (state) => state.global,
 *   (global) => global.currentPage
 * );
 * ```
 */
export const createAppSelector = createSelector.withTypes<RootState>();

export default store;
