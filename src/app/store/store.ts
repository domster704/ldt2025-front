import {configureStore, createSelector} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from "react-redux";
import userSlice from "@entities/user/model/userSlice";
import globalSlice from "@entities/global/model/globalSlice";

const store = configureStore({
  reducer: {
    global: globalSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const createAppSelector = createSelector.withTypes<RootState>();

export default store;