import {EntityState} from "@reduxjs/toolkit";

/**
 * Дополнительная медицинская информация о пациенте.
 *
 * Содержит ключевые клинические показатели, которые могут быть
 * получены в ходе обследования или анализа крови.
 *
 * - `diagnosis` — диагноз (или `null`, если не установлен).
 * - `blood_gap_ph` — pH крови.
 * - `blood_gap_co2` — уровень CO₂.
 * - `blood_gap_glu` — уровень глюкозы.
 * - `blood_gap_lac` — уровень лактата.
 * - `blood_gap_be` — базовый избыток (Base Excess).
 */
export interface PatientAdditionalInfo {
  diagnosis: string | null;
  blood_gap_ph: number | null;
  blood_gap_co2: number | null;
  blood_gap_glu: number | null;
  blood_gap_lac: number | null;
  blood_gap_be: number | null;
  anamnesis: string | null;
}

/**
 * Основная модель пациента.
 *
 * - `id` — уникальный идентификатор.
 * - `fio` — ФИО пациента.
 * - `additional_info` — дополнительная информация
 *   (или `null`, если не загружена).
 */
export interface Patient {
  id: number;
  fio: string;
  additional_info: PatientAdditionalInfo | null;
}

/**
 * Состояние Redux-среза пациентов.
 *
 * - `items` — нормализованный список всех пациентов
 * - `chosen` — выбранный пациент или `null`.
 */
export interface PatientState {
  items: EntityState<Patient, number>;
  chosen: Patient | null;
}

/**
 * Формат данных, возвращаемых API при запросе всех пациентов.
 *
 * - `data` — массив пациентов.
 */
export interface PatientData {
  data: Patient[];
}
