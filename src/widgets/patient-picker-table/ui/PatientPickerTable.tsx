import React, {FC} from 'react';
import * as style from './PatientPickerTable.module.css'
import {useAppDispatch, useAppSelector} from "@app/store/store";
import {selectAllPatients} from "@entities/patient/model/selectors";

import userBlackImg from '@shared/assets/img/userBlack.svg';
import {setChosen} from "@entities/patient/model/patientSlice";
import {Patient} from "@entities/patient/model/types";

interface PatientPickerTableProps {

}

const PatientPickerTable: FC<PatientPickerTableProps> = ({}) => {
  const dispatch = useAppDispatch();
  const patients = useAppSelector(selectAllPatients);

  const handleSelectPatient = (patient: Patient) => {
    dispatch(setChosen(patient));
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
      {
        patients.map((patient: Patient) => (
          <tr key={patient.id} onClick={() => handleSelectPatient(patient)}>
            <td className={style.patientName}>
              <img src={userBlackImg} alt={"userBlackImg"}/>
              {patient.name}
            </td>
            <td>12:30</td>
            <td>29.09.25</td>
          </tr>
        ))
      }
      </tbody>
    </table>
  );
}

export default PatientPickerTable;
