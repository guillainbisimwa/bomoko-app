import AsyncStorage from '@react-native-async-storage/async-storage';

export const BASE_URL = 'https://bomoko-backend.onrender.com/';

export const checkAuth = async () => {
  try {
    const access_token = await AsyncStorage.getItem('user');
    console.log(" ===?", access_token);
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

export const getInitialStateFromAsyncStorage = async () => {
  try {
    // Retrieve the values from AsyncStorage
    const token = await AsyncStorage.getItem('user');
    console.log(" ===>>>>>>>", token);

    // Return the initial state object with the retrieved values
    return {
      token, // Default value if token is not found in AsyncStorage
    };
  } catch (error) {
    console.error('Error retrieving data from AsyncStorage:', error);
    // Return default initial state in case of an error
    return 
  }
};


export const getToken = async () => {
  if (await checkAuth()) {
    return AsyncStorage.getItem('user');
  }
  return null
};

export const removeTokens = () => {
  AsyncStorage.removeItem('user');
};

