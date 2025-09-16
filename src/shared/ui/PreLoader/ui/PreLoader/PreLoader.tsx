import React, {FC} from "react";
import * as style from './PreLoader.module.css'

import preloaderGif from '../assets/preloader.gif'

const PreLoader: FC = () => {
  return (
    <div className={style.loader}>
      <img src={preloaderGif} alt={""}/>
    </div>
  )
}

export default PreLoader