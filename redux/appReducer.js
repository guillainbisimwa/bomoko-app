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
    setUnInstalled: (state) => {
      state.isInstalled = false;
    },
  },
});

export const { setInstalled, setUnInstalled } = appSlice.actions;

export default appSlice.reducer;
