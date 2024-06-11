import { User } from '@prisma/client';

export type AddUserReq = {
  name: string;
  email: string;
  password?: string | null;
  provider?: string | null;
  image?: string | null;
  role: string;
  isVerified: boolean;
}

export const toAddUserRes = (user: User) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    role: user.role,
    isVerified: user.isVerified
  }
}

export type GetUserReq = {
  email: string;
  password?: string;
}

export const toUserRes = (user: User) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    provider: user.provider,
    image: user.image,
    role: user.role,
    isVerified: user.isVerified
  }
}
