import React, {Suspense, useEffect} from "react";
import {Outlet, useLocation} from "react-router-dom";
import {useAppDispatch} from "@app/store/store";
import {setCurrentPage} from "@entities/global/model/globalSlice";
import {APP_URL} from "@shared/const/constants";
import {Footer} from "@widgets/Footer";
import {PreLoader} from "@shared/ui/PreLoader";
import Header from "@widgets/Header";

const RootLayout = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(location.pathname as APP_URL));
  }, [location.pathname]);


  return (
    <>
      <Header/>
      <Suspense fallback={<PreLoader/>}>
        <Outlet/>
      </Suspense>
      <Footer/>
    </>
  );
};

export default RootLayout;
