import React, {FC, ReactNode} from "react";
import {ColorContext} from "@app/providers/color-provider/lib/context";
import {RootState, useAppSelector} from "@app/store/store";
import {selectGoodColor, selectWarningColor} from "@entities/settings/model/selectors";
import {hexToRgb} from "@shared/lib/utils/convertHEXToRGB";
import {CTGStatus} from "@shared/const/ctgColors";

/**
 * Свойства компонента {@link ColorProvider}.
 */
interface ColorProviderProps {
  /**
   * Дочерние элементы, которые будут обёрнуты провайдером контекста.
   */
  children: ReactNode;
}

/**
 * Провайдер контекста для управления цветовой схемой интерфейса
 * в зависимости от статуса КТГ (Cardiotocography).
 *
 * ### Основная логика:
 * - Получает статус КТГ из `Redux store`.
 * - Если статус равен {@link CTGStatus.Normal}, применяется «хороший» цвет.
 * - Если статус отличается от нормы — применяется «предупреждающий» цвет.
 * - Цвет преобразуется из HEX в RGB и передаётся в контекст.
 *
 * ### Что отдаёт контекст:
 * - `status` — текущий статус КТГ.
 * - `color.hex` — выбранный цвет в формате HEX.
 * - `color.rgb` — выбранный цвет в формате `r, g, b`.
 *
 * ### Применение:
 * Компонент создаёт CSS-переменные:
 * - `--indicator-color` — выбранный HEX-цвет.
 * - `--indicator-color-rgb` — RGB-значение.
 *
 * Эти переменные можно использовать в стилях дочерних компонентов.
 */
export const ColorProvider: FC<ColorProviderProps> = ({children}) => {
  const status = useAppSelector((state: RootState) => state.sessionStream.status);
  const chosenWarningColor = useAppSelector(selectWarningColor);
  const chosenGoodColor = useAppSelector(selectGoodColor);

  const current = [CTGStatus.None, CTGStatus.Normal].includes(status) ? chosenGoodColor : chosenWarningColor;
  const currentRGB = hexToRgb(current);

  return (
    <ColorContext.Provider value={{
      status,
      color: {
        hex: current,
        rgb: currentRGB
      }
    }}>
      <div style={{
        "--indicator-color": current,
        "--indicator-color-rgb": currentRGB,
        height: "100%"
      }}>
        {children}
      </div>
    </ColorContext.Provider>
  );
};

export default ColorProvider;
