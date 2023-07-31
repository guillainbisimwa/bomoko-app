import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getInitialStateFromAsyncStorage} from './../constants/utils'

const authSlice = createSlice({
  name: 'user',
  initialState: {
    user: getInitialStateFromAsyncStorage()["_j"] ? getInitialStateFromAsyncStorage()["_j"] : null, // Use user data from LocalStorage or set to null
    error: null,
    isLoading: false,
  },
  // initialState: 
  // {
  //   error: null,
  //   isLoading: false,
  //   user :{
  //   token: '123456',
  //   id: '1',
  //   user: [
  //     {
  //       name: 'Guy',
  //     },
  //   ],
  // }},
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;

      // Store user data to LocalStorage
      AsyncStorage.setItem('user', JSON.stringify({ user: action.payload }));
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.isLoading = false;
      state.user = null;
      state.error = null;

      AsyncStorage.clear();

    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
