import React, {FC} from 'react';
import * as style from './PreloaderContainer.module.css'
import {useAppSelector} from "@app/store/store";
import PreLoader from "@shared/ui/preloader/ui/Preloader/Preloader";
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
        <PreLoader/>
      </div>
    </div>
  );
}

export default PreloaderContainer;
