import React, {FC} from 'react';
import * as style from './Settings.module.css'
import PageWrapper from "@shared/ui/page-wrapper";
import {SimpleHeader} from "@widgets/header";
import ColorsPicker from "@features/settings-colors-picker";
import SoundManager from "@widgets/sound-manager";
import ContainerWithLabel from "@shared/ui/container-with-label";
import ClassificationPicker from "@widgets/classification-picker";

interface SettingsProps {
}

/**
 * Страница "Настройки".
 */
const Settings: FC<SettingsProps> = ({}) => {
  return (
    <PageWrapper>
      <SimpleHeader headerText={"Настройки"}/>
      <section className={style.settings}>
        <div className={style.twoContainers}>
          <ContainerWithLabel label={"Цветовая индикация фона"}
                              className={style.settings__section}>
            <ColorsPicker/>
          </ContainerWithLabel>

          <ContainerWithLabel label={"Основная классификация"}
                              className={style.settings__section}>
            <ClassificationPicker/>
          </ContainerWithLabel>
        </div>

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
