import React, {FC} from 'react';
import * as style from './CTGDashboardHint.module.css'

import infoImg from '@shared/assets/img/info.svg';

/**
 * **CTGDashboardHint** — компонент-подсказка для панели анализа КТГ.
 *
 * ---
 * ### Назначение:
 * - Отображает небольшую подсказку пользователю о возможностях дашборда.
 * - Сообщает, что можно выбрать два исследования КТГ для их сравнения.
 *
 * ---
 * ### Визуальная структура:
 * ```
 * +--------------------------------------------------+
 * |  [icon ℹ]  Просмотр и сравнение                  |
 * |           "Выберите две КТГ, чтобы сравнить их"  |
 * +--------------------------------------------------+
 * ```
 *
 * ---
 * ### Особенности:
 * - Использует иконку `info.svg` для визуального выделения.
 * - Подходит для размещения в шапке аналитических панелей.
 * - Не содержит логики — чисто информационный компонент.
 *
 * ---
 * @example
 * ```tsx
 * import CTGDashboardHint from "@widgets/ctg-analysis-dashboard/ui/CTGDashboardHint";
 *
 * const Dashboard = () => (
 *   <div>
 *     <CTGDashboardHint />
 *     {/* другие элементы /*}
 *   </div>
 * );
 * ```
 */
const CTGDashboardHint: FC = () => {
  return (
    <div className={style.tooltip}>
      <img src={infoImg} alt="info"/>
      <div className={style.tooltip__textContainer}>
        <h4>Просмотр и сравнение</h4>
        <p>Выберите две КТГ, чтобы сравнить их</p>
      </div>
    </div>
  );
}

export default CTGDashboardHint;
