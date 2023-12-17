import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Notification {
  threshold: number;
  currency: string;
  direction: 'up' | 'down';
  time: string;
  currencyPair: string;
}

interface NotificationState {
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload);
    },
  },
});

export const { addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;