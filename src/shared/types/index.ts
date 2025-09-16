import {AppDispatch, RootState} from "@app/store/store";

export interface ThunkApi {
  state: RootState,
  dispatch: AppDispatch,
  rejectValue: any,
}
