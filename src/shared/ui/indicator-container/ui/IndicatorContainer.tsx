import React, {FC} from 'react';
import * as style from './IndicatorContainer.module.css'

interface IndicatorContainerProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Название параметра (например, "БЧСС" или "Маточная активность") */
  name: string;

  /** Значение индикатора (число или строка) */
  value: number | string;

  /** Дополнительная подпись (например, краткий код параметра: "DECG", "STV") */
  label?: string;

  /** Единицы измерения (например, "уд./мин", "мс", "%") */
  subLabel: string;

  /** Дополнительный класс для стилизации значения */
  valueClassName?: string;
}

/**
 * Контейнер для отображения отдельного медицинского показателя
 * с названием, значением и единицами измерения.
 *
 * ---
 * ### Структура:
 * ```
 * +---------------------------+
 * |  Название      [Метка]    | ← name + label
 * |        Значение           | ← value
 * |       Единицы измерения   | ← subLabel
 * +---------------------------+
 * ```
 *
 * ---
 * ### Особенности:
 * - Принимает стандартные `HTMLParagraphElement`-props (например, `style`, `onClick`).
 * - Поддерживает кастомный класс для значения (`valueClassName`).
 * - Отображает подпись (`label`) только если она передана.
 *
 * ---
 * @component
 * @example
 * ```tsx
 * import IndicatorContainer from "@shared/ui/indicator-container";
 *
 * const Example = () => (
 *   <IndicatorContainer
 *     name="Базальная ЧСС"
 *     label="DECG"
 *     value={128}
 *     subLabel="уд./мин"
 *     style={{ color: "green" }}
 *   />
 * );
 * ```
 */
const IndicatorContainer: FC<IndicatorContainerProps> = ({
                                                           name,
                                                           value,
                                                           label,
                                                           subLabel,
                                                           valueClassName,
                                                           ...props
                                                         }) => {
  return (
    <div className={style.indicatorContainer}>
      <div className={style.indicatorContainer__header}>
        <p className={style.indicatorContainer__indicatorName}>{name}</p>
        {label && (
          <p className={style.indicatorContainer__indicatorLabel}>{label}</p>
        )}
      </div>

      <p {...props} className={[
        style.indicatorContainer__value,
        valueClassName
      ].join(' ')}>{value}</p>

      <span className={style.indicatorContainer__subLabel}>{subLabel}</span>
    </div>
  );
};

export default IndicatorContainer;
