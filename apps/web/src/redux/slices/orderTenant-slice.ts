import { createSlice } from "@reduxjs/toolkit";
import { getOrderByUserId } from "./orderTenant-thunk";

type TGetRoomsByUserId = {
  orderId: string;
  quantity: number;
  price: number;
  type: string;
}

export type TGetOrdersByUserId = {
  orderId: string;
  name: string;
  propertyCategory: string;
  status: string;
  totalPayment: number;
  checkIn: string;
  checkOut: string;
  invoiceId: string;
  customerName: string;
  customerEmail: string;
  customerGender: string;
  rooms: TGetRoomsByUserId[]
}

type InitialState = {
  orders: TGetOrdersByUserId[];
  isLoading: boolean;
};

const initialState: InitialState = {
  orders: [],
  isLoading: true,
};

const orderTenantSlice = createSlice({
  name: 'orderTenantSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getOrderByUserId.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(getOrderByUserId.fulfilled, (state, action) => {
      if (action.payload)
        state.orders = action.payload.error
          ? []
          : action.payload.data;

      state.isLoading = false;
    })
  },
})

export const {} = orderTenantSlice.actions;
export default orderTenantSlice.reducer;
