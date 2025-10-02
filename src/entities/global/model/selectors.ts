import {RootState} from "@app/store/store";

/**
 * Селектор для получения текущей активной страницы приложения.
 *
 * ### Источник данных:
 * - Берёт значение `currentPage` из среза `global` Redux-хранилища.
 * - `currentPage` всегда соответствует одному из маршрутов приложения ({@link APP_URL}).
 *
 * ### Использование:
 * Этот селектор удобно применять в компонентах, где нужно знать,
 * какая страница сейчас открыта (например, для подсветки меню или управления футером).
 *
 * @param state глобальное состояние Redux
 * @returns текущий путь страницы (строка из набора {@link APP_URL})
 *
 * @example
 * ```tsx
 * import {useAppSelector} from "@app/store/store";
 * import {selectCurrentPage} from "@entities/global/model/selectors";
 *
 * const Footer = () => {
 *   const currentPage = useAppSelector(selectCurrentPage);
 *
 *   return <div>Сейчас открыта страница: {currentPage}</div>;
 * };
 * ```
 */
export const selectCurrentPage = (state: RootState) => state.global.currentPage;
