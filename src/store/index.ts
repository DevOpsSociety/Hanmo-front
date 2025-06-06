import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatSlice';
import signUpReducer from './signUpSlice';

export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;