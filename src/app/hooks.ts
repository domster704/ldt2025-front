import {useAppDispatch} from "@app/store/store";
import {useEffect} from "react";
import {setInitialColors} from "@entities/settings/model/settingsSlice";
import {setInitialSounds} from "@entities/sound/model/soundSlice";

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

    function initSounds() {
      const raw = localStorage.getItem("soundsState");
      if (raw) {
        dispatch(setInitialSounds(JSON.parse(raw)));
      }
    }

    async function init() {
    }

    init().then();
    initColors();
    initSounds();
  }, [dispatch]);
}