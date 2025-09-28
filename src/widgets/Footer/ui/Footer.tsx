import React, {FC} from 'react';
import * as style from './Footer.module.css'

import arrowLeftImg from '@shared/assets/img/arrowLeft.svg';
import arrowRightImg from '@shared/assets/img/arrowRight.svg';
import autoZeroImg from '@shared/assets/img/autoZero.svg';
import brightnessImg from '@shared/assets/img/brightness.svg';
import exportImg from '@shared/assets/img/export.svg';
import printImg from '@shared/assets/img/print.svg';
import settingsImg from '@shared/assets/img/settings.svg';
import withoutSoundImg from '@shared/assets/img/withoutSound.svg';
import ActionButton from "@shared/ui/ActionButton";
import StartEmulationButton from "@features/start-session/ui/StartEmulationButton";

const Footer: FC = () => {
  return (
    <footer className={style.footer}>
      <ActionButton icon={arrowLeftImg}/>

      <nav className={style.actionsPanel}>
        <StartEmulationButton/>
        <ActionButton icon={withoutSoundImg}
                      text={"Без звука"}/>
        <ActionButton icon={autoZeroImg}
                      text={"Auto Zero"}/>
        <ActionButton icon={printImg}
                      text={"Печать"}/>
        <ActionButton icon={exportImg}
                      text={"Выгрузка"}/>
        <ActionButton icon={brightnessImg}
                      text={"Яркость"}/>
        <ActionButton icon={settingsImg}
                      text={"Настройки"}/>
      </nav>

      <ActionButton icon={arrowRightImg}/>
    </footer>
  );
}

export default Footer;