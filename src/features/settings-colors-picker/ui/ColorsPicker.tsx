import React, {FC} from 'react';
import * as style from './ColorsPicker.module.css'
import {useAppDispatch, useAppSelector} from "@app/store/store";
import {availableGoodColors, availableWarningColors} from "@shared/const/colors";
import {setChosenGoodColor, setChosenWarningColor} from "@entities/settings/model/settingsSlice";
import {selectGoodColor, selectWarningColor} from "@entities/settings/model/selectors";

interface ColorsPickerProps {

}

const ColorsPicker: FC<ColorsPickerProps> = ({}) => {
  const dispatch = useAppDispatch();
  const chosenWarningColor = useAppSelector(selectWarningColor);
  const chosenGoodColor = useAppSelector(selectGoodColor);

  return (
    <div className={style.colorPicker}>
      <div className={style.colorPicker__colorWithText}>
        {
          availableGoodColors.map(color => (
            <button key={color}
                    className={[
                      style.colorPicker__color,
                      chosenGoodColor === color ? style.checked : ""
                    ].join(" ")}
                    style={{background: color}}
                    onClick={() => dispatch(setChosenGoodColor(color))}
            />
          ))
        }

        <p>Норма</p>
      </div>

      <div className={style.colorPicker__colorWithText}>
        {
          availableWarningColors.map(color => (
            <button key={color}
                    className={[
                      style.colorPicker__color,
                      chosenWarningColor === color ? style.checked : ""
                    ].join(" ")}
                    style={{background: color}}
                    onClick={() => dispatch(setChosenWarningColor(color))}
            />
          ))
        }

        <p>Ухудшение или негативный прогноз</p>
      </div>
    </div>
  );
}

export default ColorsPicker;
