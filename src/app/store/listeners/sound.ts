import {createListenerMiddleware, isAnyOf} from "@reduxjs/toolkit";
import {setChosenGoodColor, setChosenWarningColor} from "@entities/settings/model/settingsSlice";
import {RootState} from "@app/store/store";
import {replaceSound, setInitialSounds, setPlaying, toggleSound} from "@entities/sound/model/soundSlice";

/**
 * Ключи для хранения данных в `localStorage`.
 */
const STORAGE_SOUNDS = "soundsState";
const STORAGE_COLORS_GOOD = "goodColor";
const STORAGE_COLORS_WARN = "warningColor";

/**
 * Middleware, которое "слушает" экшены Redux и синхронизирует
 * часть состояния приложения с `localStorage`.
 *
 * ### Основные задачи:
 * - Сохранять выбранные пользователем цвета (норма/предупреждение).
 * - Сохранять настройки звуков (вкл/выкл, замена, текущий проигрываемый звук).
 *
 * Это позволяет сохранять пользовательские предпочтения
 * между сессиями (при перезагрузке страницы).
 */
export const soundListeners = createListenerMiddleware();

/**
 * Слушатель для изменения выбранных цветов.
 *
 * Реагирует на экшены:
 * - {@link setChosenGoodColor}
 * - {@link setChosenWarningColor}
 *
 * ### Эффект:
 * - Сохраняет выбранные цвета в `localStorage`
 *   под ключами `goodColor` и `warningColor`.
 */
soundListeners.startListening({
  matcher: isAnyOf(setChosenGoodColor, setChosenWarningColor),
  effect: (action, api) => {
    const state = api.getState() as RootState;
    localStorage.setItem(STORAGE_COLORS_GOOD, state.settings.goodColor);
    localStorage.setItem(STORAGE_COLORS_WARN, state.settings.warningColor);
  }
});

/**
 * Слушатель для изменения состояния звуков.
 *
 * Реагирует на экшены:
 * - {@link toggleSound} — включение/выключение звука.
 * - {@link replaceSound} — замена файла звука.
 * - {@link setPlaying} — установка текущего проигрываемого звука.
 * - {@link setInitialSounds} — восстановление звуков из `localStorage`.
 *
 * ### Эффект:
 * - Сохраняет весь объект `sound` в `localStorage`
 *   под ключом `soundsState` в JSON-формате.
 */
soundListeners.startListening({
  matcher: isAnyOf(toggleSound, replaceSound, setPlaying, setInitialSounds),
  effect: async (_action, api) => {
    const state = api.getState() as RootState;
    localStorage.setItem(STORAGE_SOUNDS, JSON.stringify(state.sound));
  },
});
