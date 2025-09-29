import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Sound, SoundType} from "./types";
import {SoundState} from "@entities/settings/model/types";

import sensorSound from "@shared/assets/sounds/sensor.mp3";
import warningSound from "@shared/assets/sounds/warning.mp3";
import criticalSound from "@shared/assets/sounds/critical.mp3";

const STORAGE_KEY = "soundsState";

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


function loadFromStorage(): SoundState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {items: initialSounds, playing: null};
    return JSON.parse(raw) as SoundState;
  } catch {
    return {items: initialSounds, playing: null};
  }
}

const initialState: SoundState = loadFromStorage();

const soundSlice = createSlice({
  name: "sounds",
  initialState,
  reducers: {
    toggleSound(state, action: PayloadAction<SoundType>) {
      const sound = state.items.find(s => s.id === action.payload);
      if (sound) {
        sound.enabled = !sound.enabled;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
    },
    replaceSound(state, action: PayloadAction<{ id: SoundType; fileName: string }>) {
      const sound = state.items.find(s => s.id === action.payload.id);
      if (sound) {
        sound.fileName = action.payload.fileName;
        sound.custom = true;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
    },
    setPlaying(state, action: PayloadAction<SoundType | null>) {
      state.playing = action.payload;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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
