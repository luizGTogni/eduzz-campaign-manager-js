import { configureStore } from '@reduxjs/toolkit';

import { authTokenSlice } from './slices/authToken';

export const store = configureStore({
  reducer: {
    authToken: authTokenSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
