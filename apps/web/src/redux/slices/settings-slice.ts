import { AccountSchema } from '@/schemas/account-schema';
import { createSlice } from '@reduxjs/toolkit';
import { getAccountThunk, updateAccountThunk } from './settings-thunk';
import { z } from 'zod';

type InitialState = {
  account: {
    name?: string | undefined;
    birthdate?: Date | undefined;
    gender?: string | undefined;
  };
  isAccountLoading: boolean;
};

const initialState: InitialState = {
  account: {
    name: undefined,
    gender: undefined,
    birthdate: undefined,
  },
  isAccountLoading: true,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(updateAccountThunk.pending, (state) => {
      state.isAccountLoading = true;
    });
    builder.addCase(updateAccountThunk.fulfilled, (state, action) => {
      if (action.payload) state.account = action.payload.data;

      state.isAccountLoading = false;
    });

    builder.addCase(getAccountThunk.pending, (state) => {
      state.isAccountLoading = true;
    });
    builder.addCase(getAccountThunk.fulfilled, (state, action) => {
      if (action.payload) state.account = action.payload.data;

      state.isAccountLoading = false;
    });
  },
});

export const {} = settingsSlice.actions;
export default settingsSlice.reducer;
