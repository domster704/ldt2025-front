import {APP_URL} from "@shared/const/constants";

export enum ClassificationType {
  FIGO = "figo",
  FISCHER = "fischer",
  SAVELYEVA = "savelyeva",
}

export interface GlobalState {
  currentPage: APP_URL;
  isWidgetLayoutEdit: boolean;
  classification: ClassificationType;
}