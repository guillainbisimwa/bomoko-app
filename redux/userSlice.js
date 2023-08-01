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
      console.log("loginnnnnnn---?????? ",response.data?.user);
     
      return response.data?.user;
    }
  );

const userSlice = createSlice({
  name: "users",
//   initialState: {
//     user: [],
//     isLoading: false,
//     error: null,
//   },
initialState: {
    user: null, // Use user data from AsyncStorage or set to null
    error: null,
    isLoading: false,
  },
  reducers: {},
  // In the extraReducers field, we define how the state should change when the asynchronous
  // thunk loginUser is in a pending, fulfilled, or rejected state. 
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
        // Store user data to LocalStorage
        AsyncStorage.setItem('user', JSON.stringify({ user: action.payload }));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
