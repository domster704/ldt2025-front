import React, {FC} from "react";
import * as style from './FooterActionsPanel.module.css'
import ActionButton from "@shared/ui/action-button";
import StartEmulationButton from "@features/start-session/ui/StartEmulationButton";
import brightnessImg from '@shared/assets/img/brightness.svg';
import printImg from '@shared/assets/img/print.svg';
import withoutSoundImg from '@shared/assets/img/withoutSound.svg';
import settingsImg from '@shared/assets/img/settings.svg';
import patientsImg from '@shared/assets/img/patients.svg';

import OpenPageButton from "@shared/ui/open-page-button";
import {PATIENT_PICKER_PAGE_URL, SETTINGS_PAGE_URL} from "@shared/const/constants";
import ExportButton from "@features/export-button";
import EditWidgetsLayoutButton from "@features/edit-widgets-layout";
import {useIsEditablePage} from "@widgets/footer/hooks/useIsPageWithBackButton";

/**
 * **FooterActionsPanel** — панель действий в футере приложения.
 *
 * ---
 * ### Основные задачи:
 * - Объединяет быстрые действия, доступные пользователю во время работы:
 *   - `Старт / Стоп эмуляции` (загрузка и проигрывание данных).
 *   - `Пациенты` — переход к выбору пациента.
 *   - `Без звука` — отключение звуковых сигналов (пока заглушка).
 *   - `Печать` — вызов системного диалога печати.
 *   - `Выгрузка` — экспорт текущего графика (через {@link ExportButton}).
 *   - `Яркость` — кнопка изменения яркости (заглушка).
 *   - `Настройки` — переход к странице настроек.
 *
 * ---
 * ### Особенности:
 * - Использует как простые {@link ActionButton}, так и {@link OpenPageButton}.
 * - Для экспорта и запуска сессии подключает специализированные компоненты:
 *   - {@link StartEmulationButton},
 *   - {@link ExportButton}.
 * - Кнопки иконки импортируются из `@shared/assets/img`.
 *
 * ---
 * ### Визуальная структура:
 * ```
 * [Старт/Стоп] [Пациенты] [Без звука] [Печать] [Выгрузка] [Яркость] [Настройки]
 * ```
 *
 * ---
 * ### Пример использования:
 * ```tsx
 * import FooterActionsPanel from "@widgets/footer/ui/FooterActionsPanel";
 *
 * const Footer = () => (
 *   <footer>
 *     <FooterActionsPanel />
 *   </footer>
 * );
 * ```
 */
const FooterActionsPanel: FC = () => {
  const isEditablePage = useIsEditablePage();

  return (
    <nav className={style.actionsPanel}>
      <StartEmulationButton/>
      <OpenPageButton page={PATIENT_PICKER_PAGE_URL}
                      icon={patientsImg}
                      text="Пациенты"/>
      <ActionButton icon={withoutSoundImg} text="Без звука"/>
      <ActionButton icon={printImg}
                    text="Печать"
                    onClick={() => {
                      print();
                    }}/>
      <ExportButton/>
      {
        isEditablePage &&
          <EditWidgetsLayoutButton/>
      }
      <ActionButton icon={brightnessImg} text="Яркость"/>
      <OpenPageButton page={SETTINGS_PAGE_URL}
                      icon={settingsImg}
                      text="Настройки"/>
    </nav>
  );
};

export default FooterActionsPanel;
