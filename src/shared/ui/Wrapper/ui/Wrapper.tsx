import React, {FC} from 'react';
import * as style from './Wrapper.module.css'

interface WrapperProps extends React.HTMLAttributes<HTMLDivElement> {
}

/**
 * Родительская обертка для установления отступов по краям
 * @constructor
 */
const Wrapper: FC<WrapperProps> = ({children, className, ...props}) => {
  return (
    <div  {...props} className={[
      className,
      style.wrapper,
    ].join(' ')}>
      {children}
    </div>
  );
}

export default Wrapper;