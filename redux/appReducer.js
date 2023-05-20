import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isInstalled: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setInstalled: (state) => {
      state.isInstalled = true;
    },
  },
});

export const { setInstalled } = appSlice.actions;

export default appSlice.reducer;
