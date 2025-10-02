import {useLocation} from "react-router-dom";
import {PATIENT_PICKER_PAGE_URL, SETTINGS_PAGE_URL} from "@shared/const/constants";

/**
 * Список страниц, на которых в футере должна отображаться кнопка "Назад".
 */
const PAGES_WITH_BACK_BUTTON = [
  SETTINGS_PAGE_URL,
  PATIENT_PICKER_PAGE_URL
];

/**
 * Хук для проверки, должна ли на текущей странице отображаться кнопка "Назад".
 *
 * ---
 * ### Логика:
 * - Получает текущий путь с помощью {@link useLocation}.
 * - Сравнивает его с предопределённым списком страниц (`PAGES_WITH_BACK_BUTTON`).
 * - Возвращает `true`, если путь начинается с одного из этих URL.
 *
 * ---
 * ### Использование:
 * Обычно применяется в футере приложения:
 * - На странице настроек (`/settings`) → показывается кнопка «Назад».
 * - На странице выбора пациента (`/patient-picker`) → показывается кнопка «Назад».
 * - На других страницах кнопка не отображается.
 *
 * ---
 * @example
 * ```tsx
 * import {useIsPageWithBackButton} from "@widgets/footer/hooks/useIsPageWithBackButton";
 *
 * const Footer = () => {
 *   const showBack = useIsPageWithBackButton();
 *
 *   return (
 *     <footer>
 *       {showBack ? <button>Назад</button> : <span>Навигация</span>}
 *     </footer>
 *   );
 * };
 * ```
 *
 * @returns `true`, если на текущей странице нужно показывать кнопку «Назад», иначе `false`.
 */
export function useIsPageWithBackButton() {
  const location = useLocation();
  return PAGES_WITH_BACK_BUTTON.some(page => location.pathname.startsWith(page));
}
