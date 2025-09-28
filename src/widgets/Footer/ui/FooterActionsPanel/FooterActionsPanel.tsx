import React, {FC} from "react";
import * as style from './FooterActionsPanel.module.css'
import ActionButton from "@shared/ui/action-button";
import StartEmulationButton from "@features/start-session/ui/StartEmulationButton";
import SettingsButton from "@features/open-settings";

import autoZeroImg from '@shared/assets/img/autoZero.svg';
import brightnessImg from '@shared/assets/img/brightness.svg';
import exportImg from '@shared/assets/img/export.svg';
import printImg from '@shared/assets/img/print.svg';
import withoutSoundImg from '@shared/assets/img/withoutSound.svg';

const FooterActionsPanel: FC = () => {
  return (
    <nav className={style.actionsPanel}>
      <StartEmulationButton/>
      <ActionButton icon={withoutSoundImg} text="Без звука"/>
      <ActionButton icon={autoZeroImg} text="Auto Zero"/>
      <ActionButton icon={printImg} text="Печать"/>
      <ActionButton icon={exportImg} text="Выгрузка"/>
      <ActionButton icon={brightnessImg} text="Яркость"/>
      <SettingsButton/>
    </nav>
  );
};

export default FooterActionsPanel;