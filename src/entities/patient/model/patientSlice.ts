import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Patient, PatientData, PatientState} from "@entities/patient/model/types";
import {fetchAllPatient, fetchPatientByID} from "@entities/patient/api/patientThunk";
import {patientAdapter} from "@entities/patient/model/adapters";

/**
 * Начальное состояние slice пациентов.
 *
 * - `items` — нормализованная коллекция пациентов
 *   (создаётся через {@link patientAdapter.getInitialState}).
 * - `chosen` — выбранный в данный момент пациент или `null`.
 */
const initialState: PatientState = {
  items: patientAdapter.getInitialState(),
  chosen: null
};

/**
 * Redux Slice для управления пациентами.
 *
 * ### Основные задачи:
 * - Хранение списка всех пациентов.
 * - Хранение выбранного пациента.
 * - Обновление данных после загрузки с сервера.
 *
 * ### Состояние:
 * - `items: EntityState<Patient, number>` — нормализованное состояние списка пациентов.
 * - `chosen: Patient | null` — выбранный пациент.
 *
 * ### Reducers:
 * - нет "обычных" редьюсеров (все изменения происходят через async-thunk'и).
 *
 * ### ExtraReducers:
 * - {@link fetchAllPatient.fulfilled}
 *   Обновляет список всех пациентов.
 *   Если `data` === `null`, состояние не меняется.
 *   Использует {@link patientAdapter.setAll} для замены всего списка.
 *
 * - {@link fetchPatientByID.fulfilled}
 *   Устанавливает выбранного пациента в `state.chosen`.
 *
 * ### Пример использования:
 * ```tsx
 * const dispatch = useAppDispatch();
 *
 * // Загрузить всех пациентов
 * useEffect(() => {
 *   dispatch(fetchAllPatient());
 * }, []);
 *
 * // Выбрать пациента по id
 * const handleSelect = (id: number) => {
 *   dispatch(fetchPatientByID(id));
 * };
 * ```
 */
const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllPatient.fulfilled, (state, action: PayloadAction<PatientData>) => {
        const {data = null} = action.payload;
        if (data === null) {
          return;
        }

        patientAdapter.setAll(state.items, data);
      })
      .addCase(fetchPatientByID.fulfilled, (state, action: PayloadAction<Patient>) => {
        state.chosen = action.payload;
      });
  },
});

export const {} = patientSlice.actions;
export default patientSlice.reducer;
