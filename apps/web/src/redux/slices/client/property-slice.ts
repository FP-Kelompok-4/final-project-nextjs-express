import { createSlice } from '@reduxjs/toolkit';
import {
  getPropertiesClientThunk,
  getPropertyDetailClientThunk,
} from './property-thunk';

export type TPropertiesClient = {
  id: string;
  name: string;
  description: string;
  location: string;
  image: string;
  price: number;
};

export type TPropertyDetailClient = {
  id: string;
  name: string;
  description: string;
  location: string;
  image: string;
  category: string;
  rooms: TRoomClient[];
};

export type TRoomClient = {
  id: string;
  type: string;
  description: string;
  roomPrice: number;
  image: string;
};

type TInitialState = {
  properties: TPropertiesClient[];
  properyDetail?: TPropertyDetailClient;
  isLoading: boolean;
  isPropertyDetailLoading: boolean;
};

const initialState: TInitialState = {
  properties: [],
  isLoading: true,
  isPropertyDetailLoading: true,
};

const propertiesClientSlice = createSlice({
  name: 'propertiesClient',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getPropertiesClientThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPropertiesClientThunk.fulfilled, (state, action) => {
      if (action.payload)
        state.properties = action.payload.error
          ? [...state.properties]
          : action.payload.data;

      state.isLoading = false;
    });

    builder.addCase(getPropertyDetailClientThunk.pending, (state) => {
      state.isPropertyDetailLoading = true;
    });
    builder.addCase(getPropertyDetailClientThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.properyDetail = action.payload.data;
      } else {
        state.properyDetail = undefined;
      }

      state.isPropertyDetailLoading = false;
    });
  },
});

export const {} = propertiesClientSlice.actions;
export default propertiesClientSlice.reducer;
