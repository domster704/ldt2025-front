import React, {FC} from "react";

import * as style from './IndicatorWrapper.module.css';
import {useAppSelector} from "@app/store/store";
import {selectHealthStatus, StreamHealthStatus} from "@entities/session-stream";
import {useColorsStatus} from "@shared/providers/color-provider";

interface IndicatorWrapperProps {
  children: React.ReactNode;
}

const IndicatorWrapper: FC<IndicatorWrapperProps> = ({children}) => {
  const {color} = useColorsStatus();
  const status: StreamHealthStatus = useAppSelector(selectHealthStatus);

  return (
    <div className={style.indicatorWrapper}>
      {children}
    </div>
  )
}

export default IndicatorWrapper;