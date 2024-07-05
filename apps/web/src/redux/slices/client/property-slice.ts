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
  minPrice: number;
  maxPrice: number;
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
  image: string;
  roomPrice: number;
  specialPrices: SpecialPrice[];
  roomAvailabilities: RoomAvailability[];
};

export type RoomAvailability = {
  id: string;
  fromDate: Date;
  toDate: Date;
  roomId: string;
  price: number;
};

export type SpecialPrice = {
  id: string;
  fromDate: Date;
  toDate: Date;
  roomId: string;
  price: number;
};

type TInitialState = {
  properties: TPropertiesClient[];
  properyDetail?: TPropertyDetailClient;
  totalPage?: number;
  totalResult?: number;
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
      if (action.payload) {
        if (!action.payload.error) {
          state.properties = action.payload.data.properties;
          state.totalPage = action.payload.data.totalPage;
          state.totalResult = action.payload.data.totalResult;
        }
      };

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
