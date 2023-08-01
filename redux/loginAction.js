import axios from 'axios';
import { loginFailure, loginStart, loginSuccess } from './authReducer';
import { BASE_URL } from '../constants/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const login = (username, password) => async (dispatch) => {
  try {
    dispatch(loginStart());

    const response = await axios.post( BASE_URL +'auth/login', {
      username,
      password,
    });

    // Save user data to LocalStorage
    AsyncStorage.setItem('user', JSON.stringify(await response.data));

    // Dispatch loginSuccess action with response data
    dispatch(loginSuccess(response.data));

  } catch (error) {
    console.log(error);
    dispatch(loginFailure(error.response.data.message));
  }
};
