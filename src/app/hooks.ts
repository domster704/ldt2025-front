import {useAppDispatch} from "@app/store/store";
import {useEffect} from "react";

export function useBootstrap() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function init() {
    }

    init().then()
  }, [dispatch]);
}