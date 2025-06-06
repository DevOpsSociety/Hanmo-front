import { configureStore } from '@reduxjs/toolkit';
import signUpReducer from './signUpSlice';

export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
