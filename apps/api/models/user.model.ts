import { User } from '@prisma/client';

export type AddUserReq = {
  name: string;
  email: string;
  password?: string | null;
  role: string;
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
