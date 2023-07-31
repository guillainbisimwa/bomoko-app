import AsyncStorage from '@react-native-async-storage/async-storage';

export const BASE_URL = 'https://bomoko-backend.onrender.com/';

export const checkAuth = () => {
  try {
    const access_token = AsyncStorage.getItem('user');

    if (!access_token) {
      return false;
    }

    // // decode the token
    // const {exp} = jwt.decode(access_token);

    // if (exp < new Date().getTime() / 1000) {
    //   return false;
    // }

    // valid token
    return true;
  } catch (e) {
    return false;
  }
};


export const getToken = () => {
  if (checkAuth()) {
    return AsyncStorage.getItem('user');
  }
};

export const removeTokens = () => {
  AsyncStorage.removeItem('user');
};

