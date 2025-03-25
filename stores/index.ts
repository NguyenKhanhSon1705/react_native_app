import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './authStore/authReducer';

export const store = configureStore({
  reducer: {
    authStore: authSlice.reducer,
  },
});

// Xuất type của RootState và AppDispatch để dễ sử dụng trong TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
