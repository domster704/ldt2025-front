import {RootState} from "@app/store/store";

export const selectAllSounds = (state: RootState) => state.sound.items;