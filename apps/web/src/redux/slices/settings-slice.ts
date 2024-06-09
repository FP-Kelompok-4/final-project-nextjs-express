import { AccountSchema } from '@/schemas/account-schema';
import { createSlice } from '@reduxjs/toolkit';
import { updateAccountThunk } from './settings-thunk';
import { z } from 'zod';

type InitialState = {
  account: z.infer<typeof AccountSchema>;
  isAccountLoading: boolean;
};

const initialState: InitialState = {
  account: {
    name: '',
    gender: '',
    birthdate: undefined,
  },
  isAccountLoading: false,
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
  },
});

export const {} = settingsSlice.actions;
export default settingsSlice.reducer;
