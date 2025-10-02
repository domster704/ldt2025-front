import React, {FC} from 'react';
import * as style from './PatientPickerTable.module.css'
import {useAppDispatch, useAppSelector} from "@app/store/store";
import {selectAllPatients} from "@entities/patient/model/selectors";

import userBlackImg from '@shared/assets/img/userBlack.svg';
import {setChosen} from "@entities/patient/model/patientSlice";
import {Patient} from "@entities/patient/model/types";
import {useNavigate} from "react-router-dom";
import {fetchPatientByID} from "@entities/patient/api/patientThunk";

interface PatientPickerTableProps {

}

const PatientPickerTable: FC<PatientPickerTableProps> = ({}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const patients = useAppSelector(selectAllPatients);

  const handleSelectPatient = async (patient: Patient) => {
    await dispatch(fetchPatientByID(patient.id)).unwrap();
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
      {
        patients.map((patient: Patient) => (
          <tr key={patient.id} onClick={() => handleSelectPatient(patient)}>
            <td className={style.patientName}>
              <img src={userBlackImg} alt={"userBlackImg"}/>
              {patient.fio}
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
