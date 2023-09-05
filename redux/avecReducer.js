// Import necessary dependencies
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../constants/utils';


// Define an initial state for AVEC objects
const initialState = {
  avecs: [], // Array to store AVEC objects
  status: 'idle', // Status for async operations
  error: null, // Error object for failed requests
};

// Create an async thunk to fetch AVEC objects
export const fetchAvecs = createAsyncThunk('avecs/fetchAll', async () => {
  try {
    const response = await axios.get(`${BASE_URL}api/avec/`);
    // console.log("=========??????", response.data);
    return response.data;
  } catch (error) {
    console.log("Error =========??????", `${BASE_URL}api/avec/`);

    throw error;
  }
});

// Create an async thunk to create a new AVEC object
export const createAvec = createAsyncThunk('avec/create', async (avecData) => {
  try {
    const response = await axios.post(`${BASE_URL}api/avec`, avecData);
    return response.data;
  } catch (error) {
    console.log("Error =========??????", `${BASE_URL}api/avec/`);

    throw error;
  }
});

// Create an async thunk to update an existing AVEC object
export const updateAvec = createAsyncThunk('avec/update', async (id) => {
  try {
    const response = await axios.put(`${BASE_URL}api/avec/${id}`, avecData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Create an async thunk to delete an AVEC object
export const deleteAvec = createAsyncThunk('avecs/delete', async (id) => {
  try {
    await axios.delete(`${BASE_URL}api/avec/${id}`);
    return avecId;
  } catch (error) {
    throw error;
  }
});

// Create a slice for AVEC objects
const avecsSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle the fetchAvecs action
    builder
      .addCase(fetchAvecs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAvecs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.avecs = action.payload;
      })
      .addCase(fetchAvecs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    // Handle the createAvec action
    builder
      .addCase(createAvec.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createAvec.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.avecs.push(action.payload);
      })
      .addCase(createAvec.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    // Handle the updateAvec action
    builder
      .addCase(updateAvec.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateAvec.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update the corresponding AVEC object
        const updatedAvecIndex = state.avecs.findIndex((avec) => avec._id === action.payload._id);
        if (updatedAvecIndex !== -1) {
          state.avecs[updatedAvecIndex] = action.payload;
        }
      })
      .addCase(updateAvec.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    // Handle the deleteAvec action
    builder
      .addCase(deleteAvec.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteAvec.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Remove the deleted AVEC object
        state.avecs = state.avecs.filter((avec) => avec._id !== action.payload);
      })
      .addCase(deleteAvec.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


// Export reducer
export default avecsSlice.reducer;
