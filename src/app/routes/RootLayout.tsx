import React, {Suspense, useEffect} from "react";
import {Outlet, useLocation} from "react-router-dom";
import {Header} from "@widgets/Header";
import {Footer} from "@widgets/Footer";
import Wrapper from "@shared/ui/Wrapper";
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
    <>
      <Header/>
      <Wrapper>
        <Suspense fallback={<PreLoader/>}>
          <Outlet/>
        </Suspense>
      </Wrapper>
      <Footer/>
    </>
  );
};

export default RootLayout;
