import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../constants/utils';
import axios from 'axios';


const product = [
{
        "_id": "64d140efab709fe55465bfaf",
        "name": "Mangues",
        "detail": "Details Details Details Details DetailsDetails Details Details",
        "images": [
            "https://raw.githubusercontent.com/guillainbisimwa/bomoko-app/add-product/assets/img/serv.jpg"
        ],
        "docs": [],
        "location": [
            "Goma",
            "",
            ""
        ],
        "amount": 222,
        'tauxInt':'20',
        "initialAmount": 111,
        "type": "service",
        "currency": "USD",
        "timeline": [
            {
                "title": "Creation du service : Guy11",
                "details": "Le service : Guy11- cree par Gb",
                "timestamp": "2023-08-07T18:12:59.186Z",
                "_id": "64d140efab709fe55465bfb0"
            }
        ],
        "status": "PENDING",
        "startDate": "2023-08-13T22:00:00.000Z",
        "endDate": "2023-08-21T21:59:59.000Z",
        "timestamp": "2023-08-07T18:12:59.186Z",
        "owner": {
            "_id": "64c96038e199bcbfe1e02654",
            "name": "Gb",
            "email": "Gb@test.com",
            "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693134452/j4gwzlhrw55mg8lmk6yc.jpg",
            "mobile": "0987654321",
            "username": "Gb",
            "role": "user",
            "status": "PENDING"
        },
        "couts": [],
        "likes": [],
        "stars": [],
        "membres": [
          
          {
            "adhesion": {
                "status": "PENDING",
                "amountDemande": 0,
                "timestamp": "2023-09-13T19:19:31.746Z"
            },
            "user": {
                "_id": "64c96038e199bcbfe1e02654",
                "name": "Gb",
                "email": "guillain@test.com",
                "mobile": "+243987654321",
                "username": "Gb",
                "role": "user",
                "status": "PENDING",
                "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693134452/j4gwzlhrw55mg8lmk6yc.jpg"
            },
            "temoins": [],
            "type": "MEMBRE",
            "timestamp": "2023-09-13T19:19:31.746Z",
            "_id": "65020c768655d8acbb923a61"
        },
        {
            "adhesion": {
                "status": "PENDING",
                "amountDemande": 0,
                "timestamp": "2023-09-13T19:58:43.886Z"
            },
            "user": {
                "_id": "64c8e9e64b2d32dee269983a",
                "name": "Justin MUHIRE",
                "email": "guy@gmail.com",
                "mobile": "0978532756",
                "username": "Justin MUHIRE",
                "role": "user",
                "status": "PENDING",
                "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693695208/iap9xrlndwa768rino9w.jpg"
            },
            "temoins": [],
            "type": "MEMBRE",
            "timestamp": "2023-09-13T19:19:31.746Z",
            "_id": "65020c768655d8acbb923a62"
        },
        {
            "adhesion": {
                "status": "PENDING",
                "amountDemande": 0,
                "timestamp": "2023-09-13T19:58:43.886Z"
            },
            "user": {
                "_id": "64c8ed6b4b2d32dee269984d",
                "name": "Guy1",
                "email": "guy@gmail.comm",
                "mobile": "09785327566",
                "username": "Guy1",
                "role": "user",
                "status": "PENDING"
            },
            "temoins": [],
            "type": "Gardeurs des clés",
            "timestamp": "2023-09-13T19:19:31.746Z",
            "_id": "65020c768655d8acbb923a63"
        },
        {
            "adhesion": {
                "status": "PENDING",
                "amountDemande": 0,
                "timestamp": "2023-09-13T19:58:43.886Z"
            },
            "user": {
                "_id": "64e885f6ff4fb6e53966fc7d",
                "name": "arrrrr",
                "email": "arrrrrr@test.me",
                "mobile": "+123456789090",
                "username": "Arrrrr",
                "role": "user",
                "cover_url": "https://res.cloudinary.com/micity/image/upload/v1693137612/hktwhhh6k2s1qwh2vci4.jpg",
                "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693137612/hktwhhh6k2s1qwh2vci4.jpg",
                "status": "PENDING"
            },
            "temoins": [],
            "type": "MEMBRE",
            "timestamp": "2023-09-13T19:19:31.746Z",
            "_id": "65020c768655d8acbb923a64"
        },
        {
            "adhesion": {
                "status": "PENDING",
                "amountDemande": 0,
                "timestamp": "2023-09-13T19:58:43.886Z"
            },
            "user": {
                "_id": "64d3a7a1774f3daebb477a53",
                "name": "Patrick",
                "email": "patrickabedi02@gmail.com",
                "mobile": "0993328512",
                "username": "Patrick",
                "role": "user",
                "status": "PENDING",
                "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693137287/uyvld8ipsiljbja3lntw.jpg"
            },
            "temoins": [],
            "type": "Secrétaire",
            "timestamp": "2023-09-13T19:19:31.746Z",
            "_id": "65020c768655d8acbb923a65"
        },
        {
            "adhesion": {
                "status": "PENDING",
                "amountDemande": 0,
                "timestamp": "2023-09-13T19:58:43.886Z"
            },
            "user": {
                "_id": "64c9920ac8285d09d37accf5",
                "name": "Ryanna ADASA",
                "email": "ryanna@test.me",
                "mobile": "9876543210",
                "username": "Ryanna ADASA",
                "role": "user",
                "status": "PENDING",
                "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693690790/pgnpjhgoytihsa8pi97p.jpg"
            },
            "temoins": [],
            "type": "Trésorier",
            "timestamp": "2023-09-13T19:19:31.746Z",
            "_id": "65020c768655d8acbb923a66"
        },
        {
            "adhesion": {
                "status": "SUBMITTED",
                "amountDemande": 0,
                "timestamp": "2023-09-13T19:58:43.886Z"
            },
            "user": {
                "_id": "64f91551149778f65a1876b2",
                "name": "test",
                "email": "test@me.com",
                "mobile": "123456789",
                "username": "test",
                "role": "user",
                "cover_url": "",
                "profile_pic": "https://raw.githubusercontent.com/guillainbisimwa/bomoko-app/master/assets/icons/gens.png",
                "status": "PENDING"
            },
            "temoins": [],
            "type": "MEMBRE",
            "timestamp": "2023-09-13T19:58:43.886Z",
            "_id": "65021a7fa98a3e8c20cc97fd"
        }
        ],
        "__v": 0
    },
    {
        "_id": "64d162366e3d9fbbd6d16309",
        "name": "Keblack",
        "detail": "Music prod",
        "images": [
            "https://res.cloudinary.com/micity/image/upload/v1691443726/xybwg2wyiptbe1zevipv.jpg"
        ],
        "docs": [],
        "location": [
            "Goma",
            "",
            ""
        ],
        "amount": 200,
        "initialAmount": 10,
        "type": "produit",
        "currency": "USD",
        "timeline": [
            {
                "title": "Creation du produit : Keblack",
                "details": "Le produit : Keblack- cree par Gb",
                "timestamp": "2023-08-07T21:12:24.376Z",
                "_id": "64d162366e3d9fbbd6d1630a"
            }
        ],
        "status": "PENDING",
        "startDate": "2023-08-14T00:00:00.000Z",
        "endDate": "2023-08-29T23:59:59.000Z",
        "timestamp": "2023-08-07T21:12:24.376Z",
        "owner": {
            "_id": "64c96038e199bcbfe1e02654",
            "name": "Gb",
            "email": "Gb@test.com",
            "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693134452/j4gwzlhrw55mg8lmk6yc.jpg",
            "mobile": "0987654321",
            "username": "Gb",
            "role": "user",
            "status": "PENDING"
        },
        "couts": [],
        "likes": [],
        "stars": [],
        "membres": [],
        "__v": 0
    },
    {
        "_id": "64d204296c29b6d54ee75022",
        "name": "Vin de banane",
        "detail": "Le vin de banane est un vin de fruit fabriqué exclusivement à partir de bananes. Elle est différente de la bière de banane, qui a une longue tradition et une grande importance culturelle en Afrique de l'Est.",
        "images": [
            "https://res.cloudinary.com/micity/image/upload/v1691485021/oz5l74dtvftbryroxuen.jpg",
            "https://res.cloudinary.com/micity/image/upload/v1691485110/bnegx1m5vt46jftsea8o.jpg",
            "https://res.cloudinary.com/micity/image/upload/v1691485164/fpqljk4lq0jbfdwjmndt.jpg"
        ],
        "docs": [],
        "location": [
            "Goma",
            "",
            ""
        ],
        "amount": 2000,
        "initialAmount": 250,
        "type": "produit",
        "currency": "USD",
        "timeline": [
            {
                "title": "Creation du produit : Vin de banane",
                "details": "Le produit : Vin de banane- cree par Gb",
                "timestamp": "2023-08-08T09:00:21.457Z",
                "_id": "64d204296c29b6d54ee75023"
            }
        ],
        "status": "ACCEPETED",
        "startDate": "2023-09-01T00:00:00.000Z",
        "endDate": "2023-09-30T23:59:59.000Z",
        "timestamp": "2023-08-08T09:00:21.457Z",
        "owner": {
            "_id": "64c96038e199bcbfe1e02650",
            "name": "Venceslas Josh",
            "email": "venceslass@test.com",
            "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693134452/j4gwzlhrw55mg8lmk6yc.jpg",
            "mobile": "0987654320",
            "username": "bvenceslass",
            "role": "user",
            "status": "PENDING"
        },
        "couts": [],
        "likes": [],
        "stars": [],
        "membres": [
          {
            "_id": "64c96038e199bcbfe1e02654",
            "name": "Gb",
            "email": "Gb@test.com",
            "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693134452/j4gwzlhrw55mg8lmk6yc.jpg",
            "mobile": "0987654321",
            "username": "Gb",
            "role": "user",
            "status": "PENDING"
        },
        ],
        "__v": 0
    },
    {
        "_id": "64d27322622db34d1e0729a5",
        "name": "Semoule de Maïs",
        "detail": "Une farine à base de maïs. Une farine à base de maïs. Une farine à base de maïs. Une farine à base de maïs. Une farine à base de maïs. Une farine à base de maïs. ",
        "images": [
            "https://res.cloudinary.com/micity/image/upload/v1691513317/tjvirnrgx0xv5pnifa7h.jpg",
            "https://res.cloudinary.com/micity/image/upload/v1691513366/ljd4wqhatnf4zlp76qbf.jpg",
            "https://res.cloudinary.com/micity/image/upload/v1691513422/ypdcwcfrmhzvjb6bakvu.jpg"
        ],
        "docs": [],
        "location": [
            "Goma",
            "Bukavu",
            "Kinshasa"
        ],
        "amount": 200,
        "initialAmount": 0,
        "type": "produit",
        "currency": "USD",
        "timeline": [
            {
                "title": "Creation du produit : Semoule de Maïs",
                "details": "Le produit : Semoule de Maïs- cree par Gb",
                "timestamp": "2023-08-08T16:53:54.035Z",
                "_id": "64d27322622db34d1e0729a6"
            }
        ],
        "status": "PENDING",
        "startDate": "2023-08-31T22:00:00.000Z",
        "endDate": "2023-09-30T21:59:59.000Z",
        "timestamp": "2023-08-08T16:53:54.035Z",
        "owner": {
            "_id": "64c96038e199bcbfe1e02654",
            "name": "Gb",
            "email": "Gb@test.com",
            "profile_pic": "https://res.cloudinary.com/micity/image/upload/v1693134452/j4gwzlhrw55mg8lmk6yc.jpg",
            "mobile": "0987654321",
            "username": "Gb",
            "role": "user",
            "status": "PENDING"
        },
        "couts": [],
        "likes": [],
        "stars": [],
        "membres": [],
        "__v": 0
    }

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
    owner,
    tauxInt
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
      owner,
      tauxInt
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
    owner,
    tauxInt
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
      owner,
      tauxInt
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
    owner,
    tauxInt
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
      owner,
      tauxInt
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
    isLoadingAdd: false,
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
      state.isLoadingAdd = true;
      
      state.error = null;
    })
    .addCase(postProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoadingAdd = false;
      
      state.lastSaved = action.payload;
      state.error = null;
      state.success = action.payload.message;

    })
    .addCase(postProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isLoadingAdd = false;
      
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
      console.log("?????? ok==",action.error.message);

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
