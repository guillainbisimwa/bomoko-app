import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const cleaner = require('./../assets/img/cleaner.jpg');
const soja = require('./../assets/img/soja.jpg');

const product = [
  {
    id: 1,
    name: 'Farine de Soja',
    detail:
      'La farine de soja est une poudre fine obtenue à partir de graines de soja dégraissées. Elle est riche en protéines végétales et présente de nombreux avantages nutritionnels. ',
    stars: 3,
    like: true,
    image: soja,
    type: 'produit',
    location: 'Goma',
    membres: [
      { id: 1, name: 'Guy L', contrib: 20 },
      { id: 2, name: 'Eva U', contrib: 20 },
    ],
    amount: 600,
  },
  {
    id: 2,
    name: 'Nettoyage de vitres',
    detail:
      "Nous offrons des solutions professionnelles pour le nettoyage et l'entretien des vitres de bâtiments résidentiels, commerciaux et industriels.",
    stars: 2,
    like: true,
    image: cleaner,
    type: 'service',
    location: 'Kinshasa',
    membres: [
      { id: 1, name: 'Guy L', contrib: 20 },
      { id: 2, name: 'Eva U', contrib: 20 },
    ],
    amount: 300,
  },
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

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [...product],
  },
  reducers: {
    addProduct: (state, action) => {
      state.products = action.payload;
      AsyncStorage.setItem('products', JSON.stringify(action.payload));
    },
    resetAllProducts: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadProductsFromStorage.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const { addProduct, resetAllProducts } = productSlice.actions;

export default productSlice.reducer;
