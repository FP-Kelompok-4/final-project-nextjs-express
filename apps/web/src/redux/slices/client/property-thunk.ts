import { api } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPropertiesClientThunk = createAsyncThunk(
  'properties/client',
  async () => {
    try {
      const res = await api.get("properties/client");

      return { success: res.data.success, data: res.data.data };
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return {
          error: e.response?.data.message,
        };
      }
    }
  }
)