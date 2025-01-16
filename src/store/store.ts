import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
//import { authApi } from "../services/authServices";
import {
  reducer as baseApiReducer,
  reducerPath as baseApiReducerPath,
  middleware as baseApiMiddleware,
} from "../services/baseApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApiReducerPath]: baseApiReducer,
    //[authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApiMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
