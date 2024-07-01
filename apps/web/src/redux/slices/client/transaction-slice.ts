import { createSlice } from '@reduxjs/toolkit';
import { addBookingClientThunk } from './transaction-thunk';

type TInitialState = {
  isLoadingAddBooking: boolean;
  orderList: any[];
};

const initialState: TInitialState = {
  isLoadingAddBooking: false,
  orderList: [],
};

const transactionClientSlice = createSlice({
  name: 'transactionClient',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    // addBookingClientThunk
    builder.addCase(addBookingClientThunk.pending, (state) => {
      state.isLoadingAddBooking = true;
    });
    builder.addCase(addBookingClientThunk.fulfilled, (state, action) => {
      if (action.payload)
        state.orderList = action.payload.error
          ? [...state.orderList]
          : [...state.orderList, action.payload.data];

      state.isLoadingAddBooking = false;
    });
  },
});

export const {} = transactionClientSlice.actions;
export default transactionClientSlice.reducer;
