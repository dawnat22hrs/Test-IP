import { configureStore } from '@reduxjs/toolkit';
import withdrawReducer from './withdrawSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    withdraw: withdrawReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
