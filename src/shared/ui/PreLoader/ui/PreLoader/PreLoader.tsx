import React, {FC} from "react";
import * as style from './PreLoader.module.css';

interface PreLoaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const PreLoader: FC<PreLoaderProps> = ({...props}) => {
  return (
    <div {...props} className={[
      style.loader,
      props.className || '',
    ].join(' ')}>
    </div>
  );
};

export default PreLoader