import { createSlice } from '@reduxjs/toolkit';
import { z } from 'zod';
import {
  addTenantPropertyThunk,
  getTenantPropertyCategoryThunk,
} from './tenant-thunk';
import { TPropertyCategory } from './propertyCategory-slice';

type InitialState = {
  properties: [];
  categories: TPropertyCategory[];
  isLoadingCategories: boolean;
  isLoadingProperties: boolean;
};

const initialState: InitialState = {
  properties: [],
  categories: [],
  isLoadingCategories: true,
  isLoadingProperties: true,
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

    builder.addCase(addTenantPropertyThunk.pending, (state) => {
      state.isLoadingProperties = true;
    });
    builder.addCase(addTenantPropertyThunk.fulfilled, (state, action) => {
      if (action.payload) state.properties = action.payload.data;

      state.isLoadingProperties = false;
    });
  },
});

export const {} = tenantSlice.actions;
export default tenantSlice.reducer;
