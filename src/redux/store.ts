import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from './slices/currencySlice';
import notificationReducer from './slices/notificationSlice';

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    notification: notificationReducer,
  },
});

// Определение типа RootState и AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
