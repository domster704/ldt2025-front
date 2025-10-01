import {RootState} from "@app/store/store";

export const selectCurrentPage = (state: RootState) => state.global.currentPage;