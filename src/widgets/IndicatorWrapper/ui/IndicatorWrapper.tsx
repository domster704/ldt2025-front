import React, {FC} from "react";

import * as style from './IndicatorWrapper.module.css';

interface IndicatorWrapperProps {
  children: React.ReactNode;
}

const IndicatorWrapper: FC<IndicatorWrapperProps> = ({children}) => {
  return (
    <div className={style.indicatorWrapper}>
      {children}
    </div>
  )
}

export default IndicatorWrapper;