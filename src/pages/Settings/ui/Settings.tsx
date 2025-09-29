import React, {FC} from 'react';
import * as style from './Settings.module.css'
import PageWrapper from "@shared/ui/page-wrapper";
import {SimpleHeader} from "@widgets/header";
import {useAppDispatch} from "@app/store/store";
import ColorsPicker from "@features/settings-colors-picker";
import SoundManager from "@widgets/sound-manager";
import ContainerWithLabel from "@shared/ui/container-with-label";

interface SettingsProps {

}

const Settings: FC<SettingsProps> = ({}) => {
  const dispatch = useAppDispatch();

  return (
    <PageWrapper>
      <SimpleHeader headerText={"Настройки"}/>
      <section className={style.settings}>
        <ContainerWithLabel label={"Цветовая индикация фона"}
                            className={style.settings__section}>
          <ColorsPicker/>
        </ContainerWithLabel>

        <ContainerWithLabel label={"Звуковые сигналы"}
                            className={[
                              style.settings__section,
                              style.soundManager__container,
                            ].join(' ')}>
          <SoundManager/>
        </ContainerWithLabel>

        <ContainerWithLabel label={"Системная информация"}
                            className={style.settings__section}>
          <br/>
          <p>
            <b>Текущая заполненность внутренней памяти: 0 GB</b>
          </p>
          <br/>
          <p>
            <b>Последняя выгрузка архива:</b> 29.09.25
          </p>
        </ContainerWithLabel>
      </section>
    </PageWrapper>
  );
};

export default Settings;