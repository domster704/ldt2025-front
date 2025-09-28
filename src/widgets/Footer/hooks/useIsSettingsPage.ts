import {useLocation} from "react-router-dom";
import {APP_URL, SETTINGS_PAGE_URL} from "@shared/const/constants";

export function useIsSettingsPage() {
  const location = useLocation();
  return location.pathname.startsWith(SETTINGS_PAGE_URL);
}