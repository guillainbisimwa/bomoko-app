import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { COLORS, icons } from '../constants';
const income = 'income';
const expense = 'expense';

const cat = [
  {
    id: 1,
    name: 'Vente',
    icon: icons.shopping,
    cat: income,
    color: COLORS.purple,
    data: [],
  },
  {
    id: 2,
    name: 'Remboursement',
    icon: icons.refund,
    cat: income,
    color: COLORS.blue,
    data: [],
  },
  {
    id: 3,
    name: 'Intérêt',
    icon: icons.interest,
    cat: income,
    color: COLORS.darkgreen,
    data: [],
  },
  {
    id: 4,
    name: 'Subvention',
    icon: icons.grant,
    cat: income,
    color: COLORS.red,
    data: [],
  },
  {
    id: 5,
    name: 'Investissement',
    icon: icons.investment,
    cat: income,
    color: COLORS.peach,
    data: [],
  },

  {
    id: 6,
    name: 'Achat',
    icon: icons.shopping,
    cat: expense,
    color: COLORS.lightBlue,
    data: [],
  },
  {
    id: 7,
    name: 'Salaire',
    icon: icons.cash,
    cat: expense,
    color: COLORS.peach,
    data: [],
  },
  {
    id: 8,
    name: "Dépenses d'exploitation",
    icon: icons.cashbook,
    cat: expense,
    color: COLORS.darkgreen,
    data: [],
  },
  {
    id: 9,
    name: "Retraits d'argent",
    icon: icons.sell,
    cat: expense,
    color: COLORS.red,
    data: [],
  },
  {
    id: 10,
    name: 'Paiements de dettes',
    icon: icons.income,
    cat: expense,
    color: COLORS.yellow,
    data: [],
  },
  {
    id: 11,
    name: 'Autres entrées',
    icon: icons.more,
    cat: income,
    color: COLORS.gray,
    data: [],
  },

  {
    id: 12,
    name: 'Autres Sorties',
    icon: icons.more,
    cat: expense,
    color: COLORS.purple,
    data: [],
  },
];

export const loadCategoriesFromStorage = createAsyncThunk(
  'categories/loadFromStorage',
  async () => {
    try {
      // Retrieve data from AsyncStorage
      const categoriesData = await AsyncStorage.getItem('categories');
      if (categoriesData) {
        // Parse the data as JSON
        const categories = JSON.parse(categoriesData);
        return categories;
      } else {
        return [...cat];
      }
    } catch (error) {
      console.error('Error loading categories from AsyncStorage:', error);
      throw error;
    }
  }
);

const catSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
  },
  reducers: {
    addCat: (state, action) => {
      state.categories = action.payload;
      AsyncStorage.setItem('categories', JSON.stringify(action.payload));

      // action.payload.forEach(async (category) => {
      //   const existingCategory = state.categories.find((cat) => cat.name === category.name);
      //   if (existingCategory) {
      //     existingCategory.data.push(...category.data);
      //     console.log('');

      //     console.log('--- ');
      //     console.log('existingCategory: ', state.categories);
      //   }
      // });
    },
    resetAllCat: (state, action) => {
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCategoriesFromStorage.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const { addCat, resetAllCat } = catSlice.actions;

export default catSlice.reducer;
