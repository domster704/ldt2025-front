import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkApi} from "@shared/types/types";
import {$apiUrl} from "@shared/const/constants";
import {Patient, PatientData} from "@entities/patient/model/types";

/**
 * Асинхронный thunk для загрузки **всех пациентов**.
 *
 * ### Запрос:
 * - Метод: `GET`
 * - URL: `${$apiUrl}/http/crud/patients`
 *
 * ### Ответ:
 * - Сервер возвращает массив пациентов.
 * - Оборачивается в объект `{ data: Patient[] }` для совместимости с {@link PatientData}.
 *
 * ### Использование в Slice:
 * - Обрабатывается в `extraReducers` {@link patientSlice}, где заполняет `state.items`.
 *
 * @async
 * @function fetchAllPatient
 * @returns {PatientData} объект с массивом пациентов
 */
export const fetchAllPatient = createAsyncThunk<PatientData, void, ThunkApi>(
  'patient/fetchAllPatient',
  async (_, {getState}) => {
    const response = await fetch(`${$apiUrl}/http/crud/patients`, {
      method: 'GET'
    });

    return {
      data: await response.json()
    } as PatientData;
  }
);

/**
 * Асинхронный thunk для загрузки **одного пациента по ID**.
 *
 * ### Запрос:
 * - Метод: `GET`
 * - URL: `${$apiUrl}/http/crud/patients/{patient_id}`
 *
 * ### Ответ:
 * - Сервер возвращает объект пациента ({@link Patient}).
 *
 * ### Использование в Slice:
 * - Обрабатывается в `extraReducers` {@link patientSlice}, где сохраняется в `state.chosen`.
 *
 * @async
 * @function fetchPatientByID
 * @param patient_id идентификатор пациента
 * @returns {Patient} объект пациента
 *
 * @example
 * ```tsx
 * const dispatch = useAppDispatch();
 * const handleSelect = (id: number) => {
 *   dispatch(fetchPatientByID(id));
 * };
 * ```
 */
export const fetchPatientByID = createAsyncThunk<Patient, number, ThunkApi>(
  'patient/fetchPatientByID',
  async (patient_id: number, {getState}) => {
    const response = await fetch(`${$apiUrl}/http/crud/patients/${patient_id}`, {
      method: 'GET'
    });

    return await response.json() as Patient;
  }
);
