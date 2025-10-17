import React, {FC} from 'react';
import * as style from './ColorsPicker.module.css';
import {useAppDispatch, useAppSelector} from "@app/store/store";
import {availableGoodColors, availableWarningColors} from "@shared/const/colors";
import {setChosenGoodColor, setChosenWarningColor} from "@entities/settings/model/settingsSlice";
import {selectGoodColor, selectWarningColor} from "@entities/settings/model/selectors";

interface ColorsPickerProps {
}

/**
 * Компонент выбора цветовой схемы для отображения состояния КТГ.
 *
 * ---
 * ### Назначение:
 * - Позволяет пользователю выбрать:
 *   - цвет для **нормального состояния** ("Норма"),
 *   - цвет для **предупреждающего/негативного состояния** ("Ухудшение или негативный прогноз").
 *
 * ---
 * ### Источники данных:
 * - `availableGoodColors` — список допустимых цветов для нормального состояния.
 * - `availableWarningColors` — список допустимых цветов для предупреждений.
 * - `selectGoodColor`, `selectWarningColor` — текущие выбранные цвета из Redux.
 *
 * ---
 * ### Логика:
 * - Текущий выбранный цвет выделяется стилем `checked`.
 * - При клике на цвет выполняется `dispatch`:
 *   - {@link setChosenGoodColor} — для нормального состояния.
 *   - {@link setChosenWarningColor} — для предупреждающего состояния.
 * - Выбранные значения сохраняются в `localStorage` через slice настроек.
 */
const ColorsPicker: FC<ColorsPickerProps> = ({}) => {
  const dispatch = useAppDispatch();
  const chosenWarningColor = useAppSelector(selectWarningColor);
  const chosenGoodColor = useAppSelector(selectGoodColor);

  return (
    <div className={style.colorPicker}>
      <div className={style.colorPicker__colorWithText}>
        {availableGoodColors.map(color => (
          <button
            key={color}
            className={[
              style.colorPicker__color,
              chosenGoodColor === color ? style.checked : ""
            ].join(" ")}
            style={{background: color}}
            onClick={() => dispatch(setChosenGoodColor(color))}
          />
        ))}
        <p>Норма</p>
      </div>

      <div className={style.colorPicker__colorWithText}>
        {availableWarningColors.map(color => (
          <button
            key={color}
            className={[
              style.colorPicker__color,
              chosenWarningColor === color ? style.checked : ""
            ].join(" ")}
            style={{background: color}}
            onClick={() => dispatch(setChosenWarningColor(color))}
          />
        ))}
        <p>Ухудшение или негативный прогноз</p>
      </div>
    </div>
  );
};

export default ColorsPicker;
