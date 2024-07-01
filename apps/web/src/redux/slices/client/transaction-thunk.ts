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
        JSON.stringify({
          userId,
          pId,
          checkIn,
          checkOut,
          rooms,
        }),
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
