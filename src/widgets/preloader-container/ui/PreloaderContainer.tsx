import React, {FC} from 'react';
import * as style from './PreloaderContainer.module.css'
import {useAppSelector} from "@app/store/store";
import Preloader from "@shared/ui/preloader";
import {selectLoadingStatus} from "@entities/session-upload/model/selectors";

interface PreloaderContainerProps {

}

const PreloaderContainer: FC<PreloaderContainerProps> = ({}) => {
  const isLoading = useAppSelector(selectLoadingStatus);
  if (!isLoading) {
    return null;
  }

  return (
    <div className={style.preloaderContainer}>
      <div className={style.preloaderContent}>
        <Preloader/>
      </div>
    </div>
  );
}

export default PreloaderContainer;
