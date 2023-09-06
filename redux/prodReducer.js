import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../constants/utils';
import axios from 'axios';


const product = [

]

export const loadProductsFromStorage = createAsyncThunk('products/loadFromStorage', async () => {
  try {
    // Retrieve data from AsyncStorage
    const productsData = await AsyncStorage.getItem('products');
    if (productsData) {
      // Parse the data as JSON
      const products = JSON.parse(productsData);
      return products;
    } else {
      return [...product];
    }
  } catch (error) {
    console.error('Error loading products from AsyncStorage:', error);
    throw error;
  }
});

// Here, we are using the createAsyncThunk function to create an asynchronous thunk to fetch 
// the list of products. 
// Then we define a new slice with an initial state containing 
// an empty list of products, isLoading flag, and an error message if any.

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(
      BASE_URL +'api/product',
    );
    //console.log("response.data ------->>", response.data);
    return response.data;
  }
);

export const postProduct = createAsyncThunk(
  "product/add",
  async ({  
    name,
    detail,
    location,
    amount,
    images,
    initialAmount,
    type,
    currency,
    timeline,
    startDate,
    endDate,
    owner 
  }) => {
    console.log(BASE_URL);
    const response = await axios.post( BASE_URL +'api/product', {
      name,
      detail,
      location,
      amount,
      images,
      initialAmount,
      type,
      currency,
      timeline,
      startDate,
      endDate,
      owner 
    });
    console.log("Add prod---?????? ok==",response.data);
    
    return response.data;
  }
);

export const editProduct = createAsyncThunk(
  "product/edit",
  async ({
    id,
    name,
    detail,
    location,
    amount,
    images,
    initialAmount,
    type,
    currency,
    timeline,
    startDate,
    endDate,
    owner
  }) => {
    const url = `${BASE_URL}api/product/${id}`; // Concatenate ID to the base URL
    
    const response = await axios.put(url, { // Use PUT request for updating
      name,
      detail,
      location,
      amount,
      images,
      initialAmount,
      type,
      currency,
      timeline,
      startDate,
      endDate,
      owner
    });

    console.log("Edit prod---?????? ok==", response.data);
    return response.data;
  }
);

export const soumettreProduct = createAsyncThunk(
  "product/soumettre",
  async ({
    id,
    name,
    detail,
    location,
    status,
    amount,
    images,
    initialAmount,
    type,
    couts,
    currency,
    timeline,
    startDate,
    endDate,
    membres,
    owner
  }) => {
    const url = `${BASE_URL}api/product/${id}`; // Concatenate ID to the base URL
    
    const response = await axios.put(url, { // Use PUT request for updating
      name,
      detail,
      location,
      status,
      amount,
      images,
      initialAmount,
      type,
      currency,
      timeline,
      startDate,
      endDate,
      couts,
      membres,
      owner
    });

    console.log("Soummetre prod---?????? ok==", { // Use PUT request for updating
      couts,
    });

    return response.data;
  }
);


export const delProduct = createAsyncThunk(
  "product/delete",
  async ({
    id
  }) => {
    const url = `${BASE_URL}api/product/${id}`; // Concatenate ID to the base URL
    const response = await axios.delete(url);
    console.log("Delete prod---?????? ok==", response.data);
    return response.data;
  }
);


const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [...product],
    isLoading: false,
    error: '',
    lastSaved: null,
    success: false,
    successUpdate: false,
  },
  reducers: {
    // addProduct: (state, action) => {
    //   state.products = action.payload;
    //   AsyncStorage.setItem('products', JSON.stringify(action.payload));
    // },
    // resetAllProducts: (state, action) => {
    //   state.products = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
    .addCase(loadProductsFromStorage.fulfilled, (state, action) => {
      state.products = action.payload;
    })
    .addCase(postProduct.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(postProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.lastSaved = action.payload;
      state.error = null;
      state.success = action.payload.message;

    })
    .addCase(postProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    })
    .addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.error = null;
    })
    .addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    })
    .addCase(editProduct.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(editProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.lastSaved = action.payload;
      state.error = null;
      state.successUpdate = true;
    })
    .addCase(editProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    })
    .addCase(delProduct.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(delProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.lastSaved = action.payload;
      state.error = null;

    })
    .addCase(delProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = "action.error.message";
    })
    .addCase(soumettreProduct.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(soumettreProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.lastSaved = action.payload;
      state.error = null;

    })
    .addCase(soumettreProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

//export const { addProduct, resetAllProducts } = productSlice.actions;

export default productSlice.reducer;
