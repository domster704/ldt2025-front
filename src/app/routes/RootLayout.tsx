import React, {Suspense, useEffect} from "react";
import {Outlet, useLocation} from "react-router-dom";
import {useAppDispatch} from "@app/store/store";
import {setCurrentPage} from "@entities/global/model/globalSlice";
import {APP_URL} from "@shared/const/constants";
import {PreLoader} from "@shared/ui/PreLoader";
import {Footer} from "@widgets/Footer";

import * as style from '../styles/App.module.css'

const RootLayout = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(location.pathname as APP_URL));
  }, [location.pathname]);

  return (
    <div className={style.layout}>
      <div className={style.content}>
        <Suspense fallback={<PreLoader/>}>
          <Outlet/>
        </Suspense>
      </div>
      <Footer/>
    </div>
  );
};

export default RootLayout;
