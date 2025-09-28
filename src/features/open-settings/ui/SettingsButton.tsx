import React, {FC} from 'react';
import settingsImg from '@shared/assets/img/settings.svg';
import ActionButton from "@shared/ui/ActionButton";
import {Link} from "react-router-dom";
import {SETTINGS_PAGE_URL} from "@shared/const/constants";

import * as style from './SettingsButton.module.css';

interface SettingsButtonProps {

}

const SettingsButton: FC<SettingsButtonProps> = ({}) => {
  return (
    <Link to={SETTINGS_PAGE_URL} className={style.settingsButtonLink}>
      <ActionButton icon={settingsImg}
                    text={"Настройки"}/>
    </Link>
  );
}

export default SettingsButton;