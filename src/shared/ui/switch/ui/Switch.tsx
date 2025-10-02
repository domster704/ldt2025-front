import React, {FC} from "react";
import * as style from "./Switch.module.css";

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Флаг состояния переключателя */
  checked: boolean;

  /** Коллбэк, вызываемый при изменении состояния */
  onChange: () => void;
}

/**
 * Компонент-переключатель (аналог `toggle` / `switch`).
 *
 * ---
 * ### Особенности:
 * - Рендерится как кастомный `<input type="checkbox">`.
 * - Использует стилизованный слайдер (`span.slider`) для имитации переключателя.
 * - Полностью поддерживает стандартные HTML-атрибуты инпута
 *   (например, `disabled`, `name`, `id`, `aria-*`).
 *
 * ---
 * ### Использование:
 * @example
 * ```tsx
 * import React, {useState} from "react";
 * import Switch from "@shared/ui/switch";
 *
 * const Example = () => {
 *   const [enabled, setEnabled] = useState(false);
 *
 *   return (
 *     <div>
 *       <Switch
 *         checked={enabled}
 *         onChange={() => setEnabled(!enabled)}
 *       />
 *       <p>Состояние: {enabled ? "Включено" : "Выключено"}</p>
 *     </div>
 *   );
 * };
 * ```
 */
const Switch: FC<SwitchProps> = ({checked, onChange, ...props}) => {
  return (
    <label className={style.switch}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <span className={style.slider}></span>
    </label>
  );
};

export default Switch;
