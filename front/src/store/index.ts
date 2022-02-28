import { configureStore } from '@reduxjs/toolkit';

import { authTokenSlice } from './slices/authToken';
import { autoCompleteSlice } from './slices/autoComplete';

export const store = configureStore({
  reducer: {
    authToken: authTokenSlice.reducer,
    autoComplete: autoCompleteSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
