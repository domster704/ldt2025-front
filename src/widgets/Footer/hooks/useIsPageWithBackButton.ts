import {useLocation} from "react-router-dom";
import {PATIENT_PICKER_PAGE_URL, SETTINGS_PAGE_URL} from "@shared/const/constants";

const PAGES_WITH_BACK_BUTTON = [
  SETTINGS_PAGE_URL,
  PATIENT_PICKER_PAGE_URL
]

export function useIsPageWithBackButton() {
  const location = useLocation();
  return PAGES_WITH_BACK_BUTTON.some(page => location.pathname.startsWith(page));
}