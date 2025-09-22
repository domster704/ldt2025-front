import React, {FC} from "react";
import * as style from './PreLoader.module.css'

const PreLoader: FC = () => {
  return (
    <div className={style.loader}></div>
  )
}

export default PreLoader