import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from "@app/store/store";
import ActionButton from "@shared/ui/action-button";
import {selectIsWidgetLayoutEdit} from "@entities/global/model/selectors";
import {setWidgetLayoutEdit} from "@entities/global/model/globalSlice";

import editIcon from '@shared/assets/img/edit.svg';
import saveIcon from '@shared/assets/img/save.svg';

interface EditWidgetsLayoutButtonProps {

}

const EditWidgetsLayoutButton: FC<EditWidgetsLayoutButtonProps> = ({}) => {
  const isWidgetLayoutEdit = useAppSelector(selectIsWidgetLayoutEdit);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setWidgetLayoutEdit(!isWidgetLayoutEdit))
  }

  return (
    <ActionButton onClick={handleClick}
                  icon={isWidgetLayoutEdit ? saveIcon : editIcon}
                  text={isWidgetLayoutEdit ? "Сохранить" : "Изменить"}/>
  );
}

export default EditWidgetsLayoutButton;
