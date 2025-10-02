import {RootState} from "@app/store/store";

/**
 * Селектор для получения выбранного пользователем **предупреждающего цвета**.
 *
 * Этот цвет используется для подсветки негативных или сомнительных состояний КТГ.
 *
 * @param state глобальное состояние Redux
 * @returns строка с HEX-цветом (например, `#e82700`)
 *
 * @example
 * ```tsx
 * const warningColor = useAppSelector(selectWarningColor);
 * return <div style={{background: warningColor}}>Внимание!</div>;
 * ```
 */
export const selectWarningColor = (state: RootState) => state.settings.warningColor;

/**
 * Селектор для получения выбранного пользователем **нормального (хорошего) цвета**.
 *
 * Этот цвет используется для подсветки состояний, когда всё в норме.
 *
 * @param state глобальное состояние Redux
 * @returns строка с HEX-цветом (например, `#00a619`)
 *
 * @example
 * ```tsx
 * const goodColor = useAppSelector(selectGoodColor);
 * return <span style={{color: goodColor}}>Показатели в норме</span>;
 * ```
 */
export const selectGoodColor = (state: RootState) => state.settings.goodColor;
