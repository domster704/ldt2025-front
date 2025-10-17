import {createEntityAdapter} from '@reduxjs/toolkit';
import {Patient} from "@entities/patient/model/types";

/**
 * Entity Adapter для управления коллекцией пациентов.
 *
 * ### Основные возможности:
 * - Нормализует состояние (разделяет `ids` и `entities`).
 * - Автоматически создаёт удобные методы для работы с коллекцией:
 *   - `addOne`, `addMany`, `setAll`, `removeOne`, `updateOne` и т.д.
 * - Позволяет легко получать данные через селекторы (`getSelectors`).
 *
 * ### Конфигурация:
 * - Тип сущности: {@link Patient}.
 * - Тип идентификатора: `number`.
 * - В качестве идентификатора используется поле `id`.
 *
 * ### Пример состояния:
 * ```ts
 * {
 *   ids: [1, 2, 3],
 *   entities: {
 *     1: { id: 1, fio: "Иванов И.И.", additional_info: null },
 *     2: { id: 2, fio: "Петров П.П.", additional_info: {...} },
 *     3: { id: 3, fio: "Сидорова А.А.", additional_info: null }
 *   }
 * }
 * ```
 */
export const patientAdapter = createEntityAdapter<Patient, number>({
  selectId: patient => patient.id,
});
