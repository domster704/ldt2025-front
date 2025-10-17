import {createAppSelector, RootState} from "@app/store/store";
import {patientAdapter} from "@entities/patient/model/adapters";

const baseSelector = (state: RootState) => state.patients.items;
const selectors = patientAdapter.getSelectors();

/**
 * Селектор для получения **всего списка пациентов**.
 *
 * 🔹 Логика:
 * - Использует адаптер {@link patientAdapter} для выборки всех сущностей.
 * - Возвращает массив пациентов в "сыром" виде (как они есть в Redux store).
 *
 * @param state глобальное состояние Redux
 * @returns массив пациентов
 */
export const selectAllPatients = createAppSelector(
  baseSelector,
  (state) => selectors
    .selectAll(state)
    .sort((a, b) => a.id - b.id)
);

/**
 * Селектор для получения **выбранного пациента**.
 *
 * 🔹 Логика:
 * - Берёт значение `chosen` из slice `patients`.
 * - Может вернуть `null`, если пациент ещё не выбран.
 *
 * @param state глобальное состояние Redux
 * @returns выбранный пациент или `null`
 */
export const selectChosenPatient = (state: RootState) => state.patients.chosen;
