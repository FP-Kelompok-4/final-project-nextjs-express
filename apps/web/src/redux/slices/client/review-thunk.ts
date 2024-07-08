import { api } from "@/lib/axios";
import { ReviewSchema } from "@/schemas/review-schema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { z } from "zod";

export const postReview = createAsyncThunk(
  'review/post',
  async (props: {token: string, payload: z.infer<typeof ReviewSchema>}) => {
    try {
      const {token, payload} = props;
      const res = await api.post(`review/`, payload,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return { success: "Success add review", data: res.data.data };
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return {
          error: e.response?.data.message,
        };
      }
    }
  },
);
