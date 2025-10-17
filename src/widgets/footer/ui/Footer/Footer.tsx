import React, {FC} from 'react';
import * as style from './Footer.module.css'

import arrowLeftImg from '@shared/assets/img/arrowLeft.svg';
import arrowRightImg from '@shared/assets/img/arrowRight.svg';
import ActionButton from "@shared/ui/action-button";
import {ActionButtonAlignment} from "@shared/ui/action-button/ui/ActionButton";
import {useNavigate} from "react-router-dom";
import OpenPageButton from "@shared/ui/open-page-button";
import {APP_URL, CONTEXT_PAGE_URL, HISTORY_PAGE_URL, STATUS_PAGE_URL} from "@shared/const/constants";
import {useIsPageWithBackButton} from "@widgets/footer/hooks/useIsPageWithBackButton";
import FooterActionsPanel from "@widgets/footer/ui/FooterActionsPanel/FooterActionsPanel";
import {useAppSelector} from "@app/store/store";
import {selectCurrentPage, selectIsWidgetLayoutEdit} from "@entities/global/model/selectors";

const NAV_PAGES: APP_URL[] = [
  STATUS_PAGE_URL,
  CONTEXT_PAGE_URL,
  HISTORY_PAGE_URL,
];

/**
 * **Footer** — нижняя панель управления и навигации.
 *
 * ---
 * ### Основные задачи:
 * - Отображает кнопки навигации по основным страницам (`status`, `context`, `history`).
 * - Включает панель действий ({@link FooterActionsPanel}) — запуск эмуляции, экспорт, настройки и т.п.
 * - В особых случаях (страницы `settings` или `patient-picker`) заменяется на кнопку «Назад».
 *
 * ---
 * ### Логика отображения:
 * - Если текущая страница определяется хелпером {@link useIsPageWithBackButton},
 *   футер рендерит только кнопку «Назад» (`navigate(-1)`).
 * - Иначе:
 *   - Кнопка «Влево» (`OpenPageButton`) — переход на предыдущую страницу в `NAV_PAGES`.
 *   - Центр — {@link FooterActionsPanel}.
 *   - Кнопка «Вправо» (`OpenPageButton`) — переход на следующую страницу в `NAV_PAGES`.
 *
 * ---
 * ### Визуальная структура:
 * ```
 * [← prev]   [Actions Panel]   [next →]
 * ```
 *
 * или, если на странице настроек/выбора пациента:
 * ```
 * [← Назад]
 * ```
 *
 * ---
 * ### Пример использования:
 * ```tsx
 * import {Footer} from "@widgets/footer";
 *
 * const Layout = () => (
 *   <div>
 *     <main>...</main>
 *     <Footer />
 *   </div>
 * );
 * ```
 */
const Footer: FC = () => {
  const navigate = useNavigate();
  const isSettingsPage = useIsPageWithBackButton();
  const currentPage = useAppSelector(selectCurrentPage);
  const isWidgetsLayoutEdit = useAppSelector(selectIsWidgetLayoutEdit);

  if (isSettingsPage) {
    return (
      <footer className={[
        style.footer,
        style.settingsPageOpen
      ].join(' ')}>
        <ActionButton
          icon={arrowLeftImg}
          text={"Назад"}
          alignment={ActionButtonAlignment.Horizontal}
          onClick={() => {
            navigate(-1);
          }}
        />
      </footer>
    );
  }

  const index = NAV_PAGES.indexOf(currentPage as APP_URL);
  const prevPage = index > 0 ? NAV_PAGES[index - 1] : null;
  const nextPage = index < NAV_PAGES.length - 1 ? NAV_PAGES[index + 1] : null;

  return (
    <footer className={style.footer}>
      <OpenPageButton page={prevPage}
                      disabled={!prevPage || isWidgetsLayoutEdit}
                      icon={arrowLeftImg}/>
      <FooterActionsPanel/>
      <OpenPageButton page={nextPage}
                      disabled={!nextPage || isWidgetsLayoutEdit}
                      icon={arrowRightImg}/>
    </footer>
  );
}

export default Footer;
