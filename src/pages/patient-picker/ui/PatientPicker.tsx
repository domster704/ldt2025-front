import React, {FC} from 'react';
import * as style from './PatientPicker.module.css'
import {useAppDispatch, useAppSelector} from "@app/store/store";
import PageWrapper from "@shared/ui/page-wrapper";
import {SimpleHeader} from "@widgets/header";

interface PatientPickerProps {

}

const PatientPicker: FC<PatientPickerProps> = ({}) => {
  const global = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();

  return (
    <PageWrapper>
      <SimpleHeader headerText={"Выбор пациента"}/>
      <div className={style.content}>
        content
      </div>
    </PageWrapper>
  );
}

export default PatientPicker;
