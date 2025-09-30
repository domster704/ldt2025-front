export const $apiUrl: string = process.env.API_URL ?? 'http://127.0.0.1:8010';
export const $wsApiUrl: string = process.env.WS_URL ?? 'ws://127.0.0.1:8010/ws/streaming';

export type APP_URL =
  | '/'
  | '/settings'
  | '/history'
  | '/patient-picker';

export const HOME_PAGE_URL: APP_URL = '/';
export const SETTINGS_PAGE_URL: APP_URL = '/settings';
export const HISTORY_PAGE_URL: APP_URL = '/history';
export const PATIENT_PICKER_PAGE_URL: APP_URL = '/patient-picker';