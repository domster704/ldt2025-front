import React, {Suspense, useEffect} from "react";
import {Outlet, useLocation} from "react-router-dom";
import {useAppDispatch} from "@app/store/store";
import {setCurrentPage} from "@entities/global/model/globalSlice";
import {APP_URL} from "@shared/const/constants";
import {PreLoader} from "@shared/ui/PreLoader";

const RootLayout = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(location.pathname as APP_URL));
  }, [location.pathname]);

  return (
    <Suspense fallback={<PreLoader/>}>
      <Outlet/>
    </Suspense>
  );
};

export default RootLayout;
