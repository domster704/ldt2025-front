import {useAppDispatch} from "@app/store/store";
import {useEffect} from "react";
import {setUserId} from "@entities/user/model/userSlice";

export function useBootstrap() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user_id = localStorage.getItem('user_id') || '1';

    async function fetchAPI() {
    }

    fetchAPI().then();
    dispatch(setUserId(user_id));
  }, [dispatch]);
}