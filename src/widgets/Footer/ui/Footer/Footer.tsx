import React, {FC} from 'react';
import * as style from './Footer.module.css'

import arrowLeftImg from '@shared/assets/img/arrowLeft.svg';
import arrowRightImg from '@shared/assets/img/arrowRight.svg';
import ActionButton from "@shared/ui/ActionButton";
import {useIsSettingsPage} from "@widgets/Footer/hooks/useIsSettingsPage";
import {ActionButtonAlignment} from "@shared/ui/ActionButton/ui/ActionButton";
import {useNavigate} from "react-router-dom";
import FooterActionsPanel from "@widgets/Footer/ui/FooterActionsPanel/FooterActionsPanel";

const Footer: FC = () => {
  const navigate = useNavigate();
  const isSettingsPage = useIsSettingsPage();

  if (isSettingsPage) {
    return (
      <footer className={[
        style.footer,
        style.settingsPageOpen
      ].join(' ')}>
        <ActionButton icon={arrowLeftImg}
                      text={"Назад"}
                      alignment={ActionButtonAlignment.Horizontal}
                      onClick={() => {
                        navigate(-1);
                      }}/>
      </footer>
    );
  }

  return (
    <footer className={style.footer}>
      <ActionButton icon={arrowLeftImg}/>

      <FooterActionsPanel/>

      <ActionButton icon={arrowRightImg}/>
    </footer>
  );
}

export default Footer;