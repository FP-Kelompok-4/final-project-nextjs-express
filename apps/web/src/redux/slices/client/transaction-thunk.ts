import { api } from '@/lib/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addBookingClientThunk = createAsyncThunk(
  'transactionClient/addBookingClient',
  async ({
    userId,
    pId,
    checkIn,
    checkOut,
    rooms,
    token,
  }: {
    userId: string;
    pId: string;
    checkIn: Date;
    checkOut: Date;
    rooms: {
      roomId: string;
      quantity: number;
    }[];
    token: string;
  }) => {
    try {
      console.log({
        userId,
        pId,
        checkIn,
        checkOut,
        rooms: JSON.stringify(rooms),
      });

      const res = await api.post(
        `transaction/booking`,
        {
          userId,
          pId,
          checkIn,
          checkOut,
          rooms: rooms,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(res.data);

      return { success: res.data.success, data: res.data.data };
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return {
          error: e.response?.data.message,
        };
      }
    }
  },
);

export const getBookingsClientThunk = createAsyncThunk(
  'transactionClient/getBookingsClient',
  async ({ userId, token }: { userId: string; token: string }) => {
    try {
      const res = await api.get(`transaction/bookings/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);

      return { success: res.data.success, data: res.data.data };
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return {
          error: e.response?.data.message,
        };
      }
    }
  },
);

export const updateBookingsClientThunk = createAsyncThunk(
  'transactionClient/updateBookingsClient',
  async ({
    userId,
    invoiceId,
    token,
  }: {
    userId: string;
    invoiceId: string;
    token: string;
  }) => {
    try {
      const res = await api.get(
        `transaction/booking/check/${userId}/${invoiceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('Transddd', res.data);

      return { success: res.data.success, data: res.data.data };
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return {
          error: e.response?.data.message,
        };
      }
    }
  },
);
