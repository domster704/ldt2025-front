import React, {FC} from 'react';
import * as style from './PatientPickerTable.module.css'
import {useAppDispatch, useAppSelector} from "@app/store/store";
import {selectAllPatients} from "@entities/patient/model/selectors";

import userBlackImg from '@shared/assets/img/userBlack.svg';
import {Patient} from "@entities/patient/model/types";
import {useNavigate} from "react-router-dom";
import {fetchPatientByID} from "@entities/patient/api/patientThunk";
import {fetchAllCTGHistory} from "@entities/ctg-history/api/ctgHistoryThunk";

interface PatientPickerTableProps {
}

/**
 * **PatientPickerTable** — таблица для выбора пациента из списка.
 *
 * ---
 * ### Основные задачи:
 * - Получает список пациентов из Redux Store через {@link selectAllPatients}.
 * - Отображает каждого пациента строкой таблицы:
 *   - ФИО.
 *   - Время приёма (пока статично — `12:30`).
 *   - Дата (пока статично — `29.09.25`).
 * - При клике по строке:
 *   1. Загружает подробную информацию о пациенте (через {@link fetchPatientByID}).
 *   2. Устанавливает выбранного пациента в `Redux Store`.
 *   3. Возвращает пользователя на предыдущую страницу (`navigate(-1)`).
 *
 * ---
 * ### Визуальная структура:
 * ```
 * ┌───────────────────────────────────────────────┐
 * | Пациент            | Время приёма |   Дата    |
 * ├───────────────────────────────────────────────┤
 * | Иванов Иван Иван   |     12:30    | 29.09.25  |
 * | Петров Петр Петр   |     12:30    | 29.09.25  |
 * └───────────────────────────────────────────────┘
 * ```
 *
 * ---
 * ### Пример использования:
 * ```tsx
 * import PatientPickerTable from "@widgets/patient-picker-table";
 *
 * const PatientPickerPage = () => (
 *   <div>
 *     <h2>Выбор пациента</h2>
 *     <PatientPickerTable />
 *   </div>
 * );
 * ```
 */
const PatientPickerTable: FC<PatientPickerTableProps> = ({}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const patients = useAppSelector(selectAllPatients);

  /**
   * Обработчик выбора пациента.
   * Загружает данные пациента и возвращает пользователя назад.
   */
  const handleSelectPatient = async (patient: Patient) => {
    await dispatch(fetchPatientByID(patient.id));
    await dispatch(fetchAllCTGHistory(patient.id));
    navigate(-1);
  }

  return (
    <table className={style.patientPicker__table}>
      <thead>
      <tr>
        <th>Пациент</th>
        <th>Время приема</th>
        <th>Дата</th>
      </tr>
      </thead>
      <tbody>
      {patients.map((patient: Patient) => (
        <tr key={patient.id} onClick={() => handleSelectPatient(patient)}>
          <td className={style.patientName}>
            <img src={userBlackImg} alt="user icon"/>
            {patient.fio}
          </td>
          {/*  TODO: Пока время и дата статичны, но можно будет заменить на реальные данные */}
          <td>12:30</td>
          <td>29.09.25</td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}

export default PatientPickerTable;
