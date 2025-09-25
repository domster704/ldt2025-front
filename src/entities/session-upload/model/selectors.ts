import {createAppSelector, RootState} from "@app/store/store";
import {sessionUploadedAdapter} from "@entities/session-upload/model/adapter";

const baseSelector = (state: RootState) => state.upload.items;
const selectors = sessionUploadedAdapter.getSelectors();

export const selectOneSession = createAppSelector(
  baseSelector,
  (state) => selectors.selectAll(state)[0]
);