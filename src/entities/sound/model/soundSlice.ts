import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Sound, SoundType} from "./types";
import {SoundState} from "@entities/settings/model/types";

import sensorSound from "@shared/assets/sounds/sensor.mp3";
import warningSound from "@shared/assets/sounds/warning.mp3";
import criticalSound from "@shared/assets/sounds/critical.mp3";

const STORAGE_KEY = "soundsState";

/**
 * Начальный набор звуков приложения.
 *
 * Каждый звук имеет:
 * - `id` — уникальный тип звука ({@link SoundType}).
 * - `name` — читаемое название.
 * - `fileName` — путь к звуковому файлу (по умолчанию встроенные).
 * - `enabled` — активен ли звук.
 */
const initialSounds: Sound[] = [
  {
    id: SoundType.SensorShift,
    name: "Смещение датчика",
    fileName: sensorSound,
    enabled: true
  },
  {
    id: SoundType.Warning,
    name: "Ухудшение состояния",
    fileName: warningSound,
    enabled: true
  },
  {
    id: SoundType.Critical,
    name: "Критические показатели",
    fileName: criticalSound,
    enabled: true
  },
];

/**
 * Восстановление состояния звуков из `localStorage`.
 *
 * - Если данные отсутствуют → возвращает {@link initialSounds}.
 * - Если JSON повреждён → откат к начальному состоянию.
 */
function loadFromStorage(): SoundState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {items: initialSounds, playing: null};
    return JSON.parse(raw) as SoundState;
  } catch {
    return {items: initialSounds, playing: null};
  }
}

/**
 * Начальное состояние слайса звуков.
 * - Загружается из `localStorage`, если данные там есть.
 * - В противном случае используется дефолтный список {@link initialSounds}.
 */
const initialState: SoundState = loadFromStorage();

/**
 * Slice Redux для управления звуками приложения.
 *
 * ### Состояние:
 * - `items: Sound[]` — список доступных звуков (вкл/выкл, имя файла, кастомность).
 * - `playing: SoundType | null` — текущий проигрываемый звук.
 *
 * ### Reducers:
 * - `toggleSound(SoundType)`
 *   Переключает состояние звука (вкл/выкл).
 *
 * - `replaceSound({id, fileName})`
 *   Заменяет файл для конкретного звука.
 *   Устанавливает флаг `custom = true`, чтобы пометить заменённый звук.
 *
 * - `setPlaying(SoundType | null)`
 *   Устанавливает идентификатор текущего проигрываемого звука
 *   или `null`, если воспроизведение остановлено.
 *
 * - `setInitialSounds(SoundState)`
 *   Полностью заменяет состояние (например, при восстановлении из `localStorage`).
 *
 * ### LocalStorage:
 * - Все изменения синхронизируются с `localStorage` через listener middleware (`soundListeners`).
 */
const soundSlice = createSlice({
  name: "sounds",
  initialState,
  reducers: {
    toggleSound(state, action: PayloadAction<SoundType>) {
      const sound = state.items.find(s => s.id === action.payload);
      if (sound) {
        sound.enabled = !sound.enabled;
      }
    },
    replaceSound(state, action: PayloadAction<{ id: SoundType; fileName: string }>) {
      const sound = state.items.find(s => s.id === action.payload.id);
      if (sound) {
        sound.fileName = action.payload.fileName;
        sound.custom = true;
      }
    },
    setPlaying(state, action: PayloadAction<SoundType | null>) {
      state.playing = action.payload;
    },
    setInitialSounds(state, action: PayloadAction<SoundState>) {
      return action.payload;
    }
  },
});

export const {
  toggleSound,
  replaceSound,
  setPlaying,
  setInitialSounds
} = soundSlice.actions;

export default soundSlice.reducer;
