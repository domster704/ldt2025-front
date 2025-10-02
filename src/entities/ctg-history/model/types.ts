import {EntityState} from "@reduxjs/toolkit";
import {SessionUploaded} from "@entities/session-upload";
import {CTGStatus} from "@shared/const/ctgColors";

/**
 * Модель одной записи истории КТГ (Cardiotocography History).
 *
 * ### Поля:
 * - `id` — уникальный идентификатор записи.
 * - `date` — дата исследования (в виде {@link Date}).
 * - `gestation` — срок беременности (например, `"38+2 нед"`).
 * - `figo` — оценка КТГ по классификации FIGO ({@link CTGStatus}).
 * - `forecast` — прогноз по FIGO ({@link CTGStatus}).
 * - `stv` — краткосрочная вариабельность (Short-Term Variability).
 * - `hr` — базальная частота сердечных сокращений плода (уд./мин).
 * - `uc` — маточные сокращения.
 * - `acceleration` — количество акцелераций.
 * - `graph` — загруженный график сессии ({@link SessionUploaded}).
 */
export interface CTGHistory {
  id: number;
  date: Date;
  gestation: string;
  figo: CTGStatus;
  forecast: CTGStatus;

  stv: number;
  hr: number;
  uc: number;
  acceleration: number;

  graph: SessionUploaded;
}

/**
 * DTO-версия {@link CTGHistory}, в которой поле `date` хранится как строка.
 *
 * Используется при работе с API (сервер возвращает дату строкой).
 */
export interface CTGHistoryDTO extends Omit<CTGHistory, "date"> {
  /** Дата исследования в строковом формате (например, `"2025-08-19"`) */
  date: string;
}

/**
 * Состояние slice истории КТГ.
 *
 * - `items` — нормализованный список записей истории
 *   (создаётся через {@link createEntityAdapter}).
 */
export interface CTGHistoryState {
  items: EntityState<CTGHistoryDTO, number>;
}

/**
 * Формат данных, возвращаемый API при запросе истории КТГ.
 *
 * - `data` — массив DTO-записей {@link CTGHistoryDTO}.
 */
export interface CTGHistoryData {
  data: CTGHistoryDTO[];
}
