import {createEntityAdapter} from '@reduxjs/toolkit';
import {CTGHistory, CTGHistoryDTO, CTGResultDTO} from "@entities/ctg-history/model/types";
import {CTGHistoryAPI, CTGResultAPI} from "@entities/ctg-history/api/schemas";
import {CTGStatus, classificationToCTGStatus} from "@shared/const/ctgColors";
import {GraphData} from "@entities/session-upload";

/**
 * Entity Adapter для управления коллекцией записей КТГ (Cardiotocography History).
 *
 * ### Основные возможности:
 * - Упрощает работу с массивами сущностей (CRUD-операции).
 * - Предоставляет методы для добавления, удаления, обновления и выборки данных.
 * - Автоматически нормализует состояние в формате:
 * ```ts
 * {
 *   ids: number[],        // массив идентификаторов
 *   entities: { [id]: CTGHistory } // словарь сущностей по id
 * }
 * ```
 *
 * ### Использование:
 * Внутри `ctgHistorySlice` адаптер применяется для:
 * - Загрузки истории из API (`setAll`).
 * - Поддержки CRUD-операций (например, `addOne`, `updateOne`, `removeOne`).
 * - Генерации мемоизированных селекторов (`getSelectors`).
 */
export const ctgHistoryAdapter = createEntityAdapter<CTGHistoryDTO, number>({
  selectId: ctg => ctg.id || 0,
});

function normalizeNumber(v: number | null | undefined): number {
  return typeof v === "number" ? v : 0;
}

/**
 * Result
 * API -> DTO
 * @param api
 */
function mapResultApiToDto(api?: CTGResultAPI): CTGResultDTO | undefined {
  if (!api) return undefined;

  const figo = api.figo ? classificationToCTGStatus[api.figo] : CTGStatus.None;
  // const savelyeva_status = api.savelyeva_status ? classificationToCTGStatus[api.savelyeva_status] : CTGStatus.None;
  // const fischer_status = api.fischer_status ? classificationToCTGStatus[api.fischer_status] : CTGStatus.None;
  const figo_prognosis =
    api.figo_prognosis ? (classificationToCTGStatus[api.figo_prognosis] ?? null) : CTGStatus.None;

  return {
    ctg_id: api.ctg_id ?? 0,
    gest_age: api.gest_age ?? "",
    bpm: normalizeNumber(api.bpm),
    uc: normalizeNumber(api.uc),
    figo,
    savelyeva_status: CTGStatus.None,
    fischer_status: CTGStatus.None,
    figo_prognosis,
    bhr: normalizeNumber(api.bhr),
    amplitude_oscillations: normalizeNumber(api.amplitude_oscillations),
    oscillation_frequency: normalizeNumber(api.oscillation_frequency),
    ltv: normalizeNumber(api.ltv),
    stv: normalizeNumber(api.stv),
    stv_little: normalizeNumber(api.stv_little),
    accelerations: normalizeNumber(api.accelerations),
    deceleration: normalizeNumber(api.deceleration),
    uterine_contractions: normalizeNumber(api.uterine_contractions),
    fetal_movements: normalizeNumber(api.fetal_movements),
    fetal_movements_little: normalizeNumber(api.fetal_movements_little),
    accelerations_little: normalizeNumber(api.accelerations_little),
    deceleration_little: normalizeNumber(api.deceleration_little),
    high_variability: normalizeNumber(api.high_variability),
    low_variability: normalizeNumber(api.low_variability),
    loss_signals: normalizeNumber(api.loss_signals),
    timestamp: api.timestamp ?? new Date().toISOString(),
  };
}

/**
 * History
 * API -> DTO
 * @param api
 */
export function mapHistoryApiToDto(api: CTGHistoryAPI): CTGHistoryDTO {
  return {
    id: api.id ?? 0,
    dir_path: api.dir_path,
    archive_path: api.archive_path ?? null,
    graph: {
      id: "1",
      bpm: [],
      uc: []
    } as GraphData,
    result: api.result ? mapResultApiToDto(api.result) : undefined,
  };
}

/**
 * Result
 * DTO -> Domain
 * @param dto
 */
function mapResultDtoToDomain(dto?: CTGResultDTO) {
  if (!dto) {
    return {
      timestamp: new Date(),
      figo: CTGStatus.None,
      figo_prognosis: CTGStatus.None,
      bpm: 0,
      uc: 0,
    } as any;
  }
  return {
    ...dto,
    timestamp: new Date(dto.timestamp),
  };
}

/**
 * History
 * DTO -> Domain
 * @param dto
 */
export function mapHistoryDtoToDomain(dto: CTGHistoryDTO): CTGHistory {
  return {
    ...dto,
    result: mapResultDtoToDomain(dto.result),
  };
}