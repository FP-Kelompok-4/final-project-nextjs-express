import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import { auth as authSession } from './auth';

import {
  publicRoute,
  authRoute,
  bothRoute,
  DEFAULT_LOGIN_REDIRECT_AS_USER,
  verificationRoute,
  tenantRoute,
  DEFAULT_LOGIN_REDIRECT_AS_TENANT,
  userRoute,
  superAdminRoute,
} from '@/routes';
import { generateAccessToken } from './lib/jwt';

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req) {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const session = await authSession();

  // if (session) {
  //   const accessToken = await generateAccessToken(session);

  //   console.log('ACCESS TOKEN: ', accessToken);
  // }

  console.log('MIDDLEWARE: ', session);

  const isUserRoute = userRoute.includes(nextUrl.pathname);
  const isBothRoute = bothRoute.includes(nextUrl.pathname);
  const isAuthRoute = authRoute.includes(nextUrl.pathname);
  const isPublicRoute = publicRoute.includes(nextUrl.pathname);
  const isVerificationRoute = nextUrl.pathname.startsWith(verificationRoute);
  const isTenantRoute = nextUrl.pathname.startsWith(tenantRoute);
  const isSuperAdminRoute = superAdminRoute.includes(nextUrl.pathname);

  if (
    isLoggedIn &&
    (session?.user.isVerified === true || session?.user.isVerified === false) &&
    session.user.role === 'TENANT' &&
    (isUserRoute || isAuthRoute || isSuperAdminRoute)
  ) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_AS_USER, req.url));
  }

  if (
    isLoggedIn &&
    session?.user.isVerified === true &&
    (session.user.role === 'USER' || session.user.role === 'TENANT') &&
    (isVerificationRoute || isSuperAdminRoute)
  ) {
    if (session.user.role === 'TENANT')
      return Response.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT_AS_TENANT, req.url),
      );

    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_AS_USER, req.url));
  }

  if (
    isLoggedIn &&
    session?.user.isVerified === false &&
    (isBothRoute || isUserRoute || isSuperAdminRoute)
  ) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_AS_USER, req.url));
  }

  if (
    isLoggedIn &&
    (session?.user.isVerified === true || session?.user.isVerified === false) &&
    session.user.role === 'USER' &&
    (isTenantRoute || isAuthRoute || isSuperAdminRoute)
  ) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_AS_USER, req.url));
  }

  if (
    !isLoggedIn &&
    (isBothRoute || isUserRoute || isVerificationRoute || isTenantRoute || isSuperAdminRoute)
  ) {
    return Response.redirect(new URL('/signin', req.url));
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
