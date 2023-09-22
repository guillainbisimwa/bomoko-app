import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appReducer';
import catReducer from './catReducer';
import coutReducer from './coutReducer';
import prodReducer from './prodReducer';
import userSlice from './userSlice';
import authReducer from './authReducer';
import avecReducer from './avecReducer';

export const store = configureStore({
  reducer: {
    user: userSlice,
    categories: catReducer,
    app: appReducer,
    products: prodReducer,
    couts: coutReducer,
    auth: authReducer,
    avecs: avecReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
