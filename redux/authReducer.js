import { createSlice } from '@reduxjs/toolkit';
import {getToken} from '../constants/utils';

// Retrieve user data from LocalStorage
const userData = getToken()
console.log("userData", userData);

const authSlice = createSlice({
  name: 'user',
  initialState: {
    // token: '123456',
    // id: '1',
    // user: [
    //   {
    //     name: 'Guy',
    //   },
    // ],
  },
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = {
        token: '',
        id: '',
        user: [],
      };
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
