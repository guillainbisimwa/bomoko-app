import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import catReducer from './catReducer';

export const store = configureStore({
  reducer: {
    user: authReducer,
    categories: catReducer,
  },
});

export default store;
