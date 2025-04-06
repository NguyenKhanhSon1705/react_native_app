import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './authStore/authReducer';
import { shopReducer } from './shopStore/shopReducer';
import { areaReducer } from './areaStore/areaReducer';
import { tableReducer } from './tableStore/tableReducer';
export const store = configureStore({
  reducer: {
    authStore: authSlice.reducer,
    areaStore: areaReducer,
    tableStore: tableReducer,
       shopStore: shopReducer
  },
});

// Xuất type của RootState và AppDispatch để dễ sử dụng trong TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
