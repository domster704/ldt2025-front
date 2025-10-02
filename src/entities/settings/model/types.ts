import {Sound, SoundType} from "@entities/sound/model/types";

/**
 * Состояние настроек интерфейса.
 *
 * - `goodColor` — текущий выбранный цвет для состояния **"норма"**.
 * - `warningColor` — текущий выбранный цвет для состояния
 *   **"ухудшение или негативный прогноз"**.
 *
 * Эти значения сохраняются в `localStorage` и используются
 * в компонентах визуализации (например, в {@link ColorProvider}).
 */
export interface SettingsState {
  goodColor: string;
  warningColor: string;
}

/**
 * Состояние звуковой системы приложения.
 *
 * - `items` — массив доступных звуков ({@link Sound}), которые пользователь может включать/выключать или заменять.
 * - `playing` — идентификатор текущего проигрываемого звука ({@link SoundType}) или `null`, если ничего не воспроизводится.
 *
 * Используется в Redux-срезе `soundSlice` для управления аудиосигналами (например, сигналом тревоги или смещения датчика).
 */
export interface SoundState {
  items: Sound[];
  playing: SoundType | null;
}
