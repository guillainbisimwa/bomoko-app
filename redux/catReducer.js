import { createSlice } from '@reduxjs/toolkit';

const catSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
  },
  reducers: {
    addCat: (state, action) => {
      action.payload.forEach((category) => {
        const existingCategory = state.categories.find((cat) => cat.name === category.name);
        if (existingCategory) {
          existingCategory.data.push(...category.data);
        }
      });
    },
    resetAllCat: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { addCat, resetAllCat } = catSlice.actions;

export default catSlice.reducer;
