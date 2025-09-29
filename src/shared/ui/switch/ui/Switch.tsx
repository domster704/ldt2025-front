import React, {FC} from "react";
import * as style from "./Switch.module.css";

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  onChange: () => void;
}

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
