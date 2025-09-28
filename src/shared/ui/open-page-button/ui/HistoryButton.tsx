import React, {FC} from 'react';
import settingsImg from '@shared/assets/img/settings.svg';
import ActionButton from "@shared/ui/action-button";
import {Link} from "react-router-dom";
import {HISTORY_PAGE_URL, SETTINGS_PAGE_URL} from "@shared/const/constants";

import * as style from './HistoryButton.module.css';

interface SettingsButtonProps {

}

const HistoryButton: FC<SettingsButtonProps> = ({}) => {
  return (
    <Link to={HISTORY_PAGE_URL} className={style.settingsButtonLink}>
      <ActionButton icon={settingsImg}
                    text={"Настройки"}/>
    </Link>
  );
}

export default HistoryButton;