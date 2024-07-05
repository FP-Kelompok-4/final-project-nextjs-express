import { api } from '@/lib/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getOrderByUserId = createAsyncThunk(
  'order-by-userId/get',
  async (props: { token: string; userId: string }) => {
    const { token, userId } = props;
    try {
      const res = await api.get(`order/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return { success: 'Success get orders', data: res.data.data };
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return {
          error: e.response?.data.message,
        };
      }
    }
  },
);

export const cancelOrderByTenantThunk = createAsyncThunk(
  'orderTenant/cancelOrderByTenant',
  async ({
    token,
    tenantId,
    userId,
    invoiceId,
  }: {
    token: string;
    tenantId: string;
    userId: string;
    invoiceId: string;
  }) => {
    try {
      const res = await api.patch(
        `order/cancel/${tenantId}/${userId}/${invoiceId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(tenantId, userId, invoiceId);
      console.log(res.data.data);

      return { success: 'Success Cancel Order', data: res.data.data };
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return {
          error: e.response?.data.message,
        };
      }
    }
  },
);
