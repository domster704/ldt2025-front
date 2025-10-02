import React, {FC, memo} from "react";
import * as style from './Preloader.module.css';

interface PreloaderProps extends React.HTMLAttributes<HTMLDivElement> {
}

const Preloader: FC<PreloaderProps> = memo(({...props}) => {
  return (
    <div {...props} className={[
      style.loader,
      props.className || '',
    ].join(' ')}>
    </div>
  );
});

export default Preloader