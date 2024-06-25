import { createSlice } from '@reduxjs/toolkit';
import { z } from 'zod';
import {
  addTenantPropertyThunk,
  getTenantPropertiesThunk,
  getTenantPropertyCategoryThunk,
} from './tenant-thunk';
import { TPropertyCategory } from './propertyCategory-slice';

export type TProperty = {
  id: string;
  name: string;
  description: string;
  location: string;
  image: string;
  propertyCategoryId: number;
};

type InitialState = {
  properties: TProperty[];
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

    builder.addCase(getTenantPropertiesThunk.pending, (state) => {
      state.isLoadingProperties = true;
    });
    builder.addCase(getTenantPropertiesThunk.fulfilled, (state, action) => {
      if (action.payload)
        state.properties = action.payload.error
          ? [...state.properties]
          : [...action.payload.data];

      state.isLoadingProperties = false;
    });

    builder.addCase(addTenantPropertyThunk.pending, (state) => {
      state.isLoadingProperties = true;
    });
    builder.addCase(addTenantPropertyThunk.fulfilled, (state, action) => {
      if (action.payload)
        state.properties = action.payload.error
          ? [...state.properties]
          : [action.payload.data, ...state.properties];

      state.isLoadingProperties = false;
    });
  },
});

export const {} = tenantSlice.actions;
export default tenantSlice.reducer;
