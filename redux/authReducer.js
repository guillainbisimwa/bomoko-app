import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authSlice = createSlice({
  name: 'user',
  initialState: {
    user: null, // Use user data from AS or set to null
    error: null,
    isLoading: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    },
    logoutUser: (state) => {
      state.isLoading = false;
      state.user = null;
      state.error = null;

      // Clear user data from AsyncStorage
      AsyncStorage.removeItem('user');

    },
  },
});

export const { loginSuccess, logoutUser } = authSlice.actions;

export default authSlice.reducer;
