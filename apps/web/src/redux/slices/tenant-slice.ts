import { createSlice } from '@reduxjs/toolkit';
import { z } from 'zod';
import { getTenantPropertyCategoryThunk } from './tenant-thunk';
import { TPropertyCategory } from './propertyCategory-slice';

type InitialState = {
  categories: TPropertyCategory[];
  isLoadingCategories: boolean;
};

const initialState: InitialState = {
  categories: [],
  isLoadingCategories: true,
};

const tenantSlice = createSlice({
  name: 'tenant',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getTenantPropertyCategoryThunk.pending, (state) => {
      state.isLoadingCategories = true;
    });
    builder.addCase(
      getTenantPropertyCategoryThunk.fulfilled,
      (state, action) => {
        if (action.payload) state.categories = action.payload.data;

        state.isLoadingCategories = false;
      },
    );
  },
});

export const {} = tenantSlice.actions;
export default tenantSlice.reducer;
