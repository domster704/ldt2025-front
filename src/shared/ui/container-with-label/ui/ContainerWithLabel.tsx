import React, {FC} from 'react';
import * as style from './ContainerWithLabel.module.css'

export enum LabelPosition {
  LEFT = 'left',
  RIGHT = 'right'
}

interface ContainerWithLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  labelPosition?: LabelPosition;
  label: string;
  children: React.ReactNode;
}

const ContainerWithLabel: FC<ContainerWithLabelProps> = ({
                                                           labelPosition = LabelPosition.LEFT,
                                                           children,
                                                           label,
                                                           ...props
                                                         }) => {
  return (
    <div {...props} className={[
      style.containerWithLabel,
      props.className || '',
    ].join(' ')}>
      <span className={[
        style.containerWithLabel__label,
        style[labelPosition]
      ].join(' ')}>{label}</span>
      {children}
    </div>
  );
}

export default ContainerWithLabel;
