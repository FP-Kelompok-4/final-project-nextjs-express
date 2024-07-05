import { api } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getOrderByUserId = createAsyncThunk(
  'order-by-userId/get',
  async (props: {token: string; userId: string;}) => {
    const {token, userId} = props;
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
  }
)
