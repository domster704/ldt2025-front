import {createListenerMiddleware, isAnyOf} from "@reduxjs/toolkit";
import {setChosenGoodColor, setChosenWarningColor} from "@entities/settings/model/settingsSlice";
import {RootState} from "@app/store/store";
import {replaceSound, setInitialSounds, setPlaying, toggleSound} from "@entities/sound/model/soundSlice";

const STORAGE_SOUNDS = "soundsState";
const STORAGE_COLORS_GOOD = "goodColor";
const STORAGE_COLORS_WARN = "warningColor";
export const soundListeners = createListenerMiddleware();

soundListeners.startListening({
  matcher: isAnyOf(setChosenGoodColor, setChosenWarningColor),
  effect: (action, api) => {
    const state = api.getState() as RootState;
    localStorage.setItem(STORAGE_COLORS_GOOD, state.settings.goodColor);
    localStorage.setItem(STORAGE_COLORS_WARN, state.settings.warningColor);
  }
});

soundListeners.startListening({
  matcher: isAnyOf(toggleSound, replaceSound, setPlaying, setInitialSounds),
  effect: async (_action, api) => {
    const state = api.getState() as RootState;
    localStorage.setItem(STORAGE_SOUNDS, JSON.stringify(state.sound));
  },
});