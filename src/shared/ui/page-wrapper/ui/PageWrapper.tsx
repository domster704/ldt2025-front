import React, {FC} from 'react';
import * as style from './PageWrapper.module.css'

interface PageWrapperProps {
  children: React.ReactNode
}

const PageWrapper: FC<PageWrapperProps> = ({children}) => {
  return (
    <div className={style.wrapper}>
      {children}
    </div>
  );
}

export default PageWrapper;