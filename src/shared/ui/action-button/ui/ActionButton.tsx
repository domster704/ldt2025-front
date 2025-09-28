import React, {FC} from 'react';
import * as style from './ActionButton.module.css'

export enum ActionButtonAlignment {
  Vertical = 'vertical',
  Horizontal = 'horizontal'
}

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string;
  alignment?: ActionButtonAlignment;
  text?: string;
}

const ActionButton: FC<ActionButtonProps> = ({
                                               icon,
                                               alignment = ActionButtonAlignment.Vertical,
                                               text,
                                               ...props
                                             }) => {
  return (
    <button {...props} className={[
      style.actionButton,
      alignment ? style[alignment] : '',
      props.className || ''
    ].join(' ')}>
      {
        icon &&
          <img className={style.actionButton__img}
               src={icon}
               alt={""}/>
      }
      {
        text &&
          <span className={style.actionButton__text}>
            {text}
          </span>
      }
    </button>
  );
}

export default ActionButton;