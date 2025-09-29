import React, {FC} from 'react';
import ActionButton from "@shared/ui/action-button";
import {Link} from "react-router-dom";
import {APP_URL} from "@shared/const/constants";

import * as style from './OpenPageButton.module.css';

interface SettingsButtonProps {
  page: APP_URL;
  icon: string;
  text?: string;
}

const OpenPageButton: FC<SettingsButtonProps> = ({
                                                   page,
                                                   icon,
                                                   text
                                                 }) => {
  return (
    <Link to={page} className={style.buttonLink}>
      <ActionButton icon={icon}
                    text={text}/>
    </Link>
  );
}

export default OpenPageButton;