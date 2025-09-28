import React, {FC} from 'react';
import * as style from './Settings.module.css'
import HeaderSettings from "@widgets/Header/ui/HeaderSettings/HeaderSettings";

interface SettingsProps {

}

const Settings: FC<SettingsProps> = ({}) => {
  return (
    <div className={style.settings__wrapper}>
      <HeaderSettings/>
      <section className={style.settings}>
        content
      </section>
    </div>
  );
};

export default Settings;