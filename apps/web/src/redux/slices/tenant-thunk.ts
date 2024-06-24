import { api } from '@/lib/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTenantPropertyCategoryThunk = createAsyncThunk(
  'tenant/getTenantPropertyCategory',
  async (props: { token: string }) => {
    try {
      const res = await api.get('properties/categories', {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });

      console.log(res.data);

      return { success: 'Success Get Account!', data: res.data.data };
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return {
          error: e.response?.data.message,
        };
      }
    }
  },
);
