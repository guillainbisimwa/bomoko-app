import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constants/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Here, we are using the createAsyncThunk function to create an asynchronous thunk to POST
// Then we define a new slice called userSlice with an initial state containing 
// an empty list of users, isLoading flag, and an error message if any.

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ( {username, password}) => {
    const response = await axios.post( BASE_URL +'auth/login', {
      username,
      password,
    });
    // console.log("loginnnnnnn---?????? ",response.data?.user);
    
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

export const loadInitialUser = async () => {
  try {
    const storedUser = await AsyncStorage.getItem('user');
    console.log("------------------------------------------------------");
    console.log("");
    console.log("storedUser-?", storedUser);
    console.log("");

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
        state.isLoading = true;
        state.error = null;
        state.success = false

      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
        state.success = true

        // Store user data to LocalStorage
        AsyncStorage.setItem('user', JSON.stringify({ user: action.payload }));
      })
      .addCase(loginUser.rejected, (state, action) => {
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
        state.isLoadingSignUp = false;
        state.errorSignUp = action.error.message;
        state.successSignUp = false
      });
  },
});
export const { logoutUser, setInitialUser } = userSlice.actions;

export default userSlice.reducer;
