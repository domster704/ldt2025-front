import {Sound, SoundType} from "@entities/sound/model/types";

export interface SettingsState {
  goodColor: string;
  warningColor: string;
}

export interface SoundState {
  items: Sound[];
  playing: SoundType | null;
}