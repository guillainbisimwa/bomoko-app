import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appReducer';
import authReducer from './authReducer';
import catReducer from './catReducer';
import coutReducer from './coutReducer';
import prodReducer from './prodReducer';

export const store = configureStore({
  reducer: {
    user: authReducer,
    categories: catReducer,
    app: appReducer,
    products: prodReducer,
    couts: coutReducer,
  },
});

export default store;
