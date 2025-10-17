import {RootState} from "@app/store/store";

export const selectLoadingStatus = (state: RootState) => state.upload.loading;