import React, {FC} from 'react';
import * as style from './Settings.module.css'
import PageWrapper from "@shared/ui/page-wrapper";
import {SimpleHeader} from "@widgets/header";
import ColorsPicker from "@features/settings-colors-picker";
import SoundManager from "@widgets/sound-manager";
import ContainerWithLabel from "@shared/ui/container-with-label";

interface SettingsProps {
}

/**
 * Страница "Настройки".
 *
 * ---
 * ### Основные секции:
 * 1. **Цветовая индикация фона**
 *    - Управляется компонентом {@link ColorsPicker}.
 *    - Пользователь может выбрать цвета для нормального состояния и для предупреждений.
 *
 * 2. **Звуковые сигналы**
 *    - Управляется компонентом {@link SoundManager}.
 *    - Позволяет включать/выключать звуки, заменять стандартные аудиофайлы и сохранять настройки.
 *
 * 3. **Системная информация**
 *    - Статический блок, показывающий состояние устройства:
 *      - заполненность внутренней памяти;
 *      - дата последней выгрузки архива.
 *    - В реальном приложении этот блок может быть связан с API системы.
 *
 * ---
 * ### Обёртки:
 * - {@link PageWrapper} — общий каркас страницы.
 * - {@link SimpleHeader} — заголовок "Настройки".
 * - {@link ContainerWithLabel} — стилизованные контейнеры с заголовками для каждого раздела.
 */
const Settings: FC<SettingsProps> = ({}) => {
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
