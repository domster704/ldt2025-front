import {configureStore, createSelector} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from "react-redux";
import globalSlice from "@entities/global/model/globalSlice";
import uploadSlice from "@entities/session-upload/model/uploadSlice";
import sessionStreamSlice from "@entities/session-stream/model/sessionStreamSlice";

const store = configureStore({
  reducer: {
    global: globalSlice,
    upload: uploadSlice,
    sessionStream: sessionStreamSlice
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