import React, {FC} from 'react';
import * as style from './Settings.module.css'
import PageWrapper from "@shared/ui/page-wrapper";
import {SimpleHeader} from "@widgets/header";
import {availableGoodColors, availableWarningColors} from "@shared/const/colors";
import {useAppDispatch, useAppSelector} from "@app/store/store";
import {selectGoodColor, selectWarningColor} from "@entities/settings/model/selectors";
import {setChosenGoodColor, setChosenWarningColor} from "@entities/settings/model/settingsSlice";

interface SettingsProps {

}

const Settings: FC<SettingsProps> = ({}) => {
  const dispatch = useAppDispatch();
  const chosenWarningColor = useAppSelector(selectWarningColor);
  const chosenGoodColor = useAppSelector(selectGoodColor);

  return (
    <PageWrapper>
      <SimpleHeader headerText={"Настройки"}/>
      <section className={style.settings}>
        <div className={style.settings__section}>
          <span className={style.settings__sectionLabel}>Цветовая индикация фона</span>

          <div className={style.settings__colorPicker}>
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
        </div>

        <div className={style.settings__section}>
          <span className={style.settings__sectionLabel}>Звуковые сигналы</span>
        </div>

        <div className={style.settings__section}>
          <span className={style.settings__sectionLabel}>Системная информация</span>

          <br/>
          <p>
            <b>Текущая заполненность внутренней памяти: 0 GB</b>
          </p>
          <br/>
          <p>
            <b>Последняя выгрузка архива:</b> 29.09.25
          </p>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Settings;