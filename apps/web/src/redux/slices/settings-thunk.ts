import { api } from '@/lib/axios';
import { AccountSchema } from '@/schemas/account-schema';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { z } from 'zod';

export const updateAccountThunk = createAsyncThunk(
  'settings/updateAccount',
  async (values: z.infer<typeof AccountSchema>) => {
    try {
      const res = await api.put('users/account', values);

      console.log(res.data);

      return { success: 'Success Account Update!', data: res.data };
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return {
          error: e.response?.data.message,
        };
      }
    }
  },
);
