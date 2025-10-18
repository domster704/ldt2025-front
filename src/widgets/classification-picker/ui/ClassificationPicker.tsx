import React, {FC} from 'react';
import * as style from './ClassificationPicker.module.css'
import {useAppDispatch, useAppSelector} from "@app/store/store";
import {selectClassificationType} from "@entities/global/model/selectors";
import {ClassificationType} from "@entities/global/model/types";
import {setClassification} from "@entities/global/model/globalSlice";

interface ClassificationPickerProps {

}

const CLASSIFICATION_LABELS: Record<ClassificationType, string> = {
  [ClassificationType.FIGO]: "FIGO",
  [ClassificationType.FISCHER]: "Фишер",
  [ClassificationType.SAVELYEVA]: "Савельева",
};

const ClassificationPicker: FC<ClassificationPickerProps> = ({}) => {
  const classificationType = useAppSelector(selectClassificationType);
  const dispatch = useAppDispatch();

  const handleChange = (type_: ClassificationType) => {
    dispatch(setClassification(type_));
  };

  return (
    <div className={style.classificationPicker}>
      {
        Object.values(ClassificationType).map((type) => (
          <label key={type}
                 className={`${style.option} ${
                   classificationType === type ? style.active : ""
                 }`}
                 onClick={() => handleChange(type)}>
            <span className={style.circle}/>
            <span className={style.labelText}>{CLASSIFICATION_LABELS[type]}</span>
          </label>
        ))
      }
    </div>
  );
}

export default ClassificationPicker;
