import React, {FC} from 'react';
import ActionButton from "@shared/ui/action-button";
import {Link} from "react-router-dom";
import {APP_URL} from "@shared/const/constants";

import * as style from './OpenPageButton.module.css';

interface SettingsButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  page: APP_URL | null;
  icon: string;
  text?: string;
}

const OpenPageButton: FC<SettingsButtonProps> = ({
                                                   page,
                                                   icon,
                                                   text,
                                                   ...props
                                                 }) => {
  if (!page) {
    return <ActionButton {...props}
                         icon={icon}
                         text={text}/>;
  }
  return (
    <Link to={page} className={style.buttonLink}>
      <ActionButton {...props}
                    icon={icon}
                    text={text}/>
    </Link>
  );
}

export default OpenPageButton;