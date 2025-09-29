import React, {FC} from 'react';
import * as style from './Settings.module.css'
import PageWrapper from "@shared/ui/page-wrapper";
import {SimpleHeader} from "@widgets/header";

interface SettingsProps {

}

const Settings: FC<SettingsProps> = ({}) => {
  return (
    <PageWrapper>
      <SimpleHeader headerText={"Настройки"}/>
      <section className={style.settings}>
        <div className={style.settings__section}>
          <span className={style.settings__sectionLabel}>Цветовая индикация фона</span>

          <div className={style.settings__colorPicker}>
            <div className={style.colorPicker__colorWithText}>
              <span className={style.colorPicker__color} style={{
                background: "#00a619"
              }}></span>
              <p>Норма</p>
            </div>

            <div className={style.colorPicker__colorWithText}>
              <button className={[
                style.colorPicker__color,
                style.checked
              ].join(' ')} style={{
                background: "#e87000"
              }}></button>
              <button className={style.colorPicker__color} style={{
                background: "#e82700"
              }}></button>
              <button className={style.colorPicker__color} style={{
                background: "#3a00e8"
              }}></button>
              <button className={style.colorPicker__color} style={{
                background: "#e80080"
              }}></button>

              <p>Ухудшение или негативный прогноз</p>
            </div>
          </div>
        </div>

        {/*<div className={style.settings__section}>*/}
        {/*  <span className={style.settings__sectionLabel}>Звуковые сигналы</span>*/}
        {/*</div>*/}

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