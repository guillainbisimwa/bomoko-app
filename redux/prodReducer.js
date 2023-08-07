import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../constants/utils';
import axios from 'axios';


const product = [
  // {
  //   id: 1,
  //   name: 'Farine de Soja',
  //   detail:
  //     'La farine de soja est une poudre fine obtenue à partir de graines de soja dégraissées. Elle est riche en protéines végétales et présente de nombreux avantages nutritionnels. ',
  //   stars: 3,
  //   like: true,
  //   image: soja,
  //   images: [soja, soja2],
  //   type: 'produit',
  //   location: 'Goma',
  //   membres: [
  //     { id: 1, name: 'Guy L', contrib: 20 },
  //     { id: 2, name: 'Eva U', contrib: 20 },
  //   ],
  //   amount: 600,
  // },
  // {
  //   id: 2,
  //   name: 'Nettoyage de vitres',
  //   detail:
  //     "Nous offrons des solutions professionnelles pour le nettoyage et l'entretien des vitres de bâtiments résidentiels, commerciaux et industriels.",
  //   stars: 2,
  //   like: true,
  //   image: cleaner,
  //   images: [cleaner, cleaner2],
  //   type: 'service',
  //   location: 'Kinshasa kisangani',
  //   membres: [
  //     { id: 1, name: 'Guy L', contrib: 20 },
  //     { id: 2, name: 'Eva U', contrib: 20 },
  //   ],
  //   amount: 300,
  // },
];

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
    console.log("response.data ------->>", response.data);
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


const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [...product],
    isLoading: false,
    error: '',
    lastSaved: null
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
    });
  },
});

//export const { addProduct, resetAllProducts } = productSlice.actions;

export default productSlice.reducer;
