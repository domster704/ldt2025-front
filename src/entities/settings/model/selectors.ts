import {RootState} from "@app/store/store";

export const selectWarningColor = (state: RootState) => state.settings.warningColor;
export const selectGoodColor = (state: RootState) => state.settings.goodColor;