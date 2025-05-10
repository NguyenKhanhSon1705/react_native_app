import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './authStore/authReducer';
import { shopReducer } from './shopStore/shopReducer';
import { areaReducer } from './areaStore/areaReducer';
import { tableReducer } from './tableStore/tableReducer';
import { tableAreaReducer } from './tableareaStore/tableareaReducer';
import { tableDishReducer } from './tabledishStore/tabledishReducer';
import { dishReducer } from './dishStore/dishReducer';
export const store = configureStore({
  reducer: {
    authStore: authSlice.reducer,
    areaStore: areaReducer,
    tableStore: tableReducer,
    shopStore: shopReducer,
    tableAreaStore: tableAreaReducer,
    tableDishStore: tableDishReducer,
    dishStore: dishReducer
  },
});

// Xuất type của RootState và AppDispatch để dễ sử dụng trong TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
