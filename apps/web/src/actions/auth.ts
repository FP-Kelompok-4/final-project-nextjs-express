'use server'

import * as z from 'zod'
import { SignupSchema } from '@/schemas/auth-schema'
import { api } from '@/lib/axios'
import axios from 'axios'

export const singup = async (values: z.infer<typeof SignupSchema>) => {
  try {
    await api.post('users/', values)

    return { success: 'Success signup!' }
  } catch (e) {
    if(axios.isAxiosError(e)) {
      return {
        error: e.response?.data.message
      }
    }
  }
}