import React, {FC} from "react";
import * as style from './FooterActionsPanel.module.css'
import ActionButton from "@shared/ui/action-button";
import StartEmulationButton from "@features/start-session/ui/StartEmulationButton";
import brightnessImg from '@shared/assets/img/brightness.svg';
import exportImg from '@shared/assets/img/export.svg';
import printImg from '@shared/assets/img/print.svg';
import withoutSoundImg from '@shared/assets/img/withoutSound.svg';
import settingsImg from '@shared/assets/img/settings.svg';
import patientsImg from '@shared/assets/img/patients.svg';

import OpenPageButton from "@shared/ui/open-page-button";
import {PATIENT_PICKER_PAGE_URL, SETTINGS_PAGE_URL} from "@shared/const/constants";
import ExportButton from "@features/export-button";

const FooterActionsPanel: FC = () => {
  return (
    <nav className={style.actionsPanel}>
      <StartEmulationButton/>
      <OpenPageButton page={PATIENT_PICKER_PAGE_URL}
                      icon={patientsImg}
                      text="Пациенты"/>
      <ActionButton icon={withoutSoundImg} text="Без звука"/>
      {/*<ActionButton icon={autoZeroImg} text="Auto Zero"/>*/}
      <ActionButton icon={printImg}
                    text="Печать"
                    onClick={() => {
                      print();
                    }}/>
      <ExportButton/>
      <ActionButton icon={brightnessImg} text="Яркость"/>
      <OpenPageButton page={SETTINGS_PAGE_URL}
                      icon={settingsImg}
                      text="Настройки"/>
    </nav>
  );
};

export default FooterActionsPanel;