import React, {Suspense, useEffect} from "react";
import {Outlet, useLocation} from "react-router-dom";
import {useAppDispatch} from "@app/store/store";
import {setCurrentPage} from "@entities/global/model/globalSlice";
import {APP_URL} from "@shared/const/constants";
import Preloader from "@shared/ui/preloader";
import {Footer} from "@widgets/footer";

import * as style from '../styles/App.module.css'

/**
 * Главный контейнер приложения (layout).
 *
 * ### Основные функции:
 * - Использует {@link useLocation} для отслеживания текущего пути
 *   и диспатчит его в Redux через {@link setCurrentPage}.
 * - Оборачивает вложенные маршруты в {@link React.Suspense}, показывая
 *   {@link Preloader} во время загрузки.
 * - Добавляет футер ({@link Footer}), который отображается на всех страницах.
 *
 * ### Структура:
 * ```
 * <div className={style.layout}>
 *   <div className={style.content}>
 *     <Suspense fallback={<Preloader/>}>
 *       <Outlet />  // здесь рендерятся дочерние роуты
 *     </Suspense>
 *   </div>
 *   <Footer />       // фиксированный футер
 * </div>
 * ```
 *
 * @component
 *
 * @example
 * ```tsx
 * import {createHashRouter, RouterProvider} from "react-router-dom";
 * import RootLayout from "@app/routes/RootLayout";
 * import CTGStatusPage from "@pages/ctg-status-page";
 *
 * const router = createHashRouter([
 *   {
 *     path: "/",
 *     element: <RootLayout />,
 *     children: [
 *       { index: true, element: <CTGStatusPage /> },
 *       { path: "/status", element: <CTGStatusPage /> }
 *     ]
 *   }
 * ]);
 *
 * const App = () => <RouterProvider router={router} />;
 * ```
 */
const RootLayout = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(location.pathname as APP_URL));
  }, [location.pathname]);

  return (
    <div className={style.layout}>
      <div className={style.content}>
        <Suspense fallback={<Preloader/>}>
          <Outlet/>
        </Suspense>
      </div>
      <Footer/>
    </div>
  );
};

export default RootLayout;
