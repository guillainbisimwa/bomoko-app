import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constants/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Here, we are using the createAsyncThunk function to create an asynchronous thunk to POST
// Then we define a new slice called userSlice with an initial state containing 
// an empty list of users, isLoading flag, and an error message if any.

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ( {mobile, password}) => {
    console.log({mobile, password});
    console.log(BASE_URL +'auth/login-phone');
    const response = await axios.post( BASE_URL +'auth/login-phone', {
      mobile,
      password,
    });
    console.log("loginnnnnnn---?????? ", await response.data);
    
    return response.data?.user;
  }
);

export const signUpUser = createAsyncThunk(
  "user/signUpUser",
  async ({  
    name,
    email,
    mobile,
    username,
    password,
    cover_url, 
    profile_pic,
    role
  }) => {
    const response = await axios.post( BASE_URL +'auth/signup', {
      name,
      email,
      mobile,
      username,
      password,
      cover_url, 
      profile_pic,
      role
    });
    console.log("Signup---?????? ",response.data);
    
    return response.data;
  }
);


export const editUser = createAsyncThunk(
  "user/edit",
  async ({
    userId,
    name,
    email,
    mobile,
    username,
    cover_url, 
    profile_pic,
    role
  }) => {
    const url = `${BASE_URL}auth/update-user/${userId}`; // Concatenate ID to the base URL
    const response = await axios.put(url, { // Use PUT request for updating
      name,
      email,
      mobile,
      username,
      cover_url, 
      profile_pic,
      role
    });
    console.log("Edit---?????? ",response.data);
    
    return response.data;
  }
);


export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({
    userId,
    password,
  }) => {
    const url = `${BASE_URL}auth/reset-password/${userId}`; // Concatenate ID to the base URL
    const response = await axios.put(url, { // Use PUT request for updating
      password,
    });
    console.log("Reset---?????? ",response.data);
    
    return response.data;
  }
);

export const loadInitialUser = async () => {
  try {
    const storedUser = await AsyncStorage.getItem('user');

    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error('Error reading user data from AsyncStorage:', error);
    return null;
  }
};


const userSlice = createSlice({
  name: "users",
  initialState: {
    user: null,//loadInitialUser(), // Use user data from AsyncStorage or set to null
    error: null,
    isLoading: false,
    success: false,
    userSignUp: null,

    errorSignUp: null,
    isLoadingSignUp: false,
    successSignUp: false,
  },
  reducers: {
    // Add a logoutUser action to clear user data
    logoutUser: (state) => {
      state.user = null;
      state.error = null;
      state.isLoading = false;
      state.success = false;
      state.userSignUp = null;

      // Clear user data from AsyncStorage
      AsyncStorage.removeItem('user');
      // AsyncStorage.clear();
    },
    // Set initial user data from AsyncStorage
    setInitialUser: (state, action) => {
      state.user = action.payload;
    },
  },
  // In the extraReducers field, we define how the state should change when the asynchronous
  // thunk loginUser is in a pending, fulfilled, or rejected state. 
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        console.log('loginUser.pending')
        state.isLoading = true;
        state.error = null;
        state.success = false

      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('loginUser.fulfilled')

        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
        state.success = true

        // Store user data to LocalStorage
        AsyncStorage.setItem('user', JSON.stringify({ user: action.payload }));
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log('loginUser.rejected')

        state.isLoading = false;
        state.error = action.error.message;
        state.success = false
      })
      .addCase(signUpUser.pending, (state) => {
        state.isLoadingSignUp = true;
        state.errorSignUp = null;
        state.successSignUp = false

      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoadingSignUp= false;
        state.userSignUp = action.payload;
        state.errorSignUp = null;
        state.successSignUp = true

        // Store user data to LocalStorage
        //AsyncStorage.setItem('user', JSON.stringify({ user: action.payload }));
      })
      .addCase(signUpUser.rejected, (state, action) => {
        console.log("bree *************** ",action.error);
        console.log("bree ***************");
        console.log("bree ***************");
        state.isLoadingSignUp = false;
        state.errorSignUp = action.error.message;
        state.successSignUp = false
      })
      .addCase(editUser.pending, (state) => {
        state.isLoadingSignUp = true;
        state.errorSignUp = null;
        state.successSignUp = false

      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isLoadingSignUp= false;
        state.userSignUp = action.payload;
        state.errorSignUp = null;
        state.successSignUp = true

        // Store user data to LocalStorage
        //AsyncStorage.setItem('user', JSON.stringify({ user: action.payload }));
      })
      .addCase(resetPassword.rejected, (state, action) => {
        console.log("bree *************** ",action.error.message);
        state.isLoadingSignUp = false;
        state.errorSignUp = action.error.message;
        state.successSignUp = false
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoadingSignUp = true;
        state.errorSignUp = null;
        state.successSignUp = false

      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoadingSignUp= false;
        state.userSignUp = action.payload;
        state.errorSignUp = null;
        state.successSignUp = true

        // Store user data to LocalStorage
        //AsyncStorage.setItem('user', JSON.stringify({ user: action.payload }));
      })
      .addCase(editUser.rejected, (state, action) => {
        console.log("bree *************** ",action.error.message);
        state.isLoadingSignUp = false;
        state.errorSignUp = action.error.message;
        state.successSignUp = false
      });
  },
});
export const { logoutUser, setInitialUser } = userSlice.actions;

export default userSlice.reducer;
