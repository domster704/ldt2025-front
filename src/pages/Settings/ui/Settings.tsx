import React, {FC} from 'react';
import * as style from './Settings.module.css'
import {HeaderSettings} from "@widgets/header";
import PageWrapper from "@shared/ui/page-wrapper";

interface SettingsProps {

}

const Settings: FC<SettingsProps> = ({}) => {
  return (
    <PageWrapper>
      <HeaderSettings/>
      <section className={style.settings}>
        content
      </section>
    </PageWrapper>
  );
};

export default Settings;