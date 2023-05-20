import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appReducer';
import authReducer from './authReducer';
import catReducer from './catReducer';

export const store = configureStore({
  reducer: {
    user: authReducer,
    categories: catReducer,
    app: appReducer,
  },
});

export default store;
