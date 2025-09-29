import {useAppDispatch} from "@app/store/store";
import {useEffect} from "react";
import {setInitialColors} from "@entities/settings/model/settingsSlice";

export function useBootstrap() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    function initColors() {
      const goodColor = localStorage.getItem("goodColor");
      const warningColor = localStorage.getItem("warningColor");

      dispatch(setInitialColors({
        goodColor: goodColor || undefined,
        warningColor: warningColor || undefined
      }));
    }


    async function init() {
    }

    init().then();
    initColors();
  }, [dispatch]);
}