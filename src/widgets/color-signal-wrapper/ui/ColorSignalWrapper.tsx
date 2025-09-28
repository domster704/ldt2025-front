import React, {FC} from "react";

import * as style from './ColorSignalWrapper.module.css';

interface IndicatorWrapperProps {
  children: React.ReactNode;
}

const ColorSignalWrapper: FC<IndicatorWrapperProps> = ({children}) => {
  return (
    <div className={style.indicatorWrapper}>
      {children}
    </div>
  )
}

export default ColorSignalWrapper;