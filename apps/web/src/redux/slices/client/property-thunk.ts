import { api } from '@/lib/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CodeSquare } from 'lucide-react';

export const getPropertiesClientThunk = createAsyncThunk(
  'propertiesClient/getPropertiesClient',
  async () => {
    try {
      const res = await api.get('properties/client');

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

export const getPropertyDetailClientThunk = createAsyncThunk(
  'propertiesClient/getPropertyDetailClient',
  async ({ id }: { id: string }) => {
    try {
      const res = await api.get(`properties/client/${id}`);

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
