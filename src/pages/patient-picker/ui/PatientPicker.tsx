import React, {FC} from 'react';
import * as style from './PatientPicker.module.css'
import PageWrapper from "@shared/ui/page-wrapper";
import {SimpleHeader} from "@widgets/header";
import PatientPickerTable from "@widgets/patient-picker-table";

interface PatientPickerProps {
}

/**
 * Страница "Выбор пациента".
 *
 * ---
 * ### Основные элементы:
 * - {@link PageWrapper} — общий контейнер страницы.
 * - {@link SimpleHeader} — заголовок с текстом "Выбор пациента".
 * - {@link PatientPickerTable} — таблица со списком доступных пациентов:
 *   - отображает имя пациента и дополнительные данные;
 *   - при клике на строку выбирает пациента и возвращает на предыдущую страницу.
 *
 * ---
 * ### Логика:
 * - Состояние пациентов хранится в Redux (см. `patientSlice`).
 * - `PatientPickerTable` получает список пациентов через селектор `selectAllPatients`.
 * - При выборе пациента вызывается thunk `fetchPatientByID`, чтобы загрузить детальную информацию.
 * - После выбора выполняется `navigate(-1)` → возврат на предыдущую страницу (например, статус или контекст).
 */
const PatientPicker: FC<PatientPickerProps> = ({}) => {
  return (
    <PageWrapper>
      <SimpleHeader headerText={"Выбор пациента"}/>
      <div className={style.content}>
        <PatientPickerTable/>
      </div>
    </PageWrapper>
  );
}

export default PatientPicker;
