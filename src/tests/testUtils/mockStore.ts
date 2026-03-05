import { configureStore } from '@reduxjs/toolkit';
import withdrawReducer from '@/store/withdrawSlice';

export const createTestStore = () =>
  configureStore({
    reducer: {
      withdraw: withdrawReducer,
    },
  });
