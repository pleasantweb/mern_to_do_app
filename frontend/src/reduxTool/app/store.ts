import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { baseApi } from '../query/baseApi';
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    auth:authReducer,
    [baseApi.reducerPath] : baseApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
