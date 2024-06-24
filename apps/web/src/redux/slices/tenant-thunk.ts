import { api } from '@/lib/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import * as z from 'zod';
import { PropertySchema } from '@/schemas/property-schema';

export const getTenantPropertyCategoryThunk = createAsyncThunk(
  'tenant/getTenantPropertyCategory',
  async (props: { token: string }) => {
    try {
      const res = await api.get('properties/categories', {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });

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

export const addTenantPropertyThunk = createAsyncThunk(
  'tenant/addTenantProperty',
  async (props: {
    token: string;
    email: string;
    body: z.infer<typeof PropertySchema>;
  }) => {
    try {
      const res = await api.post(
        'properties/',
        { email: props.email, ...props.body },
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      
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
