import React, {FC} from 'react';
import * as style from './Footer.module.css'

import arrowLeftImg from '@shared/assets/img/arrowLeft.svg';
import arrowRightImg from '@shared/assets/img/arrowRight.svg';
import ActionButton from "@shared/ui/action-button";
import {ActionButtonAlignment} from "@shared/ui/action-button/ui/ActionButton";
import {useNavigate} from "react-router-dom";
import OpenPageButton from "@shared/ui/open-page-button";
import {HISTORY_PAGE_URL, HOME_PAGE_URL} from "@shared/const/constants";
import {useIsSettingsPage} from "@widgets/footer/hooks/useIsSettingsPage";
import FooterActionsPanel from "@widgets/footer/ui/FooterActionsPanel/FooterActionsPanel";

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
      <OpenPageButton page={HOME_PAGE_URL}
                      icon={arrowLeftImg}/>

      <FooterActionsPanel/>

      <OpenPageButton page={HISTORY_PAGE_URL}
                      icon={arrowRightImg}/>
    </footer>
  );
}

export default Footer;