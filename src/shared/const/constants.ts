/**
 * Базовый URL для HTTP API-бэкенда.
 */
export const $apiUrl: string = process.env.API_URL ?? 'http://127.0.0.1:8010';

/**
 * Базовый URL для WebSocket API.
 */
export const $wsApiUrl: string = process.env.WS_URL ?? 'ws://127.0.0.1:8010/ws/streaming/';

/**
 * Тип всех допустимых путей внутри приложения.
 *
 * Используется для типобезопасной работы с роутами и Redux (`currentPage`).
 */
export type APP_URL =
  | '/'
  | '/settings'
  | '/history'
  | '/patient-picker'
  | '/status'
  | '/context';

/** Путь к странице настроек */
export const SETTINGS_PAGE_URL: APP_URL = '/settings';
/** Путь к странице статуса КТГ */
export const STATUS_PAGE_URL: APP_URL = '/status';
/** Путь к странице контекстного анализа КТГ */
export const CONTEXT_PAGE_URL: APP_URL = '/context';
/** Путь к странице истории КТГ */
export const HISTORY_PAGE_URL: APP_URL = '/history';
/** Путь к странице выбора пациента */
export const PATIENT_PICKER_PAGE_URL: APP_URL = '/patient-picker';
