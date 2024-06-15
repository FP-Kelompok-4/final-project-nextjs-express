import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { auth as authSession } from "./auth"

import {
  publicRoute,
  authRoute,
  userRoute,
  DEFAULT_LOGIN_REDIRECT_AS_USER,
  verificationRoute,
  tenantRoute,
  DEFAULT_LOGIN_REDIRECT_AS_TENANT,
  bothRoute
  } from "@/routes"
import { generateAccessToken } from "./lib/jwt";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req) {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const session = await authSession();

  if (session) {
    const accessToken = await generateAccessToken(session)
    
    console.log("ACCESS TOKEN: ", accessToken);
  }

  console.log("MIDDLEWARE: ", session);

  const isUserRoute = userRoute.includes(nextUrl.pathname);
  const isAuthRoute = authRoute.includes(nextUrl.pathname);
  const isPublicRoute = publicRoute.includes(nextUrl.pathname);
  const isVerificationRoute = nextUrl.pathname.startsWith(verificationRoute);
  const isTenantRoute = nextUrl.pathname.startsWith(tenantRoute);
  const isBothRoute = bothRoute.includes(nextUrl.pathname);

  if (
    isLoggedIn &&
    (session?.user.isVerified === true || session?.user.isVerified === false) &&
    session.user.role === "TENANT" &&
    (isPublicRoute || isUserRoute || isAuthRoute)
  ) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_AS_TENANT, nextUrl));
  }

  if (
    isLoggedIn &&
    session?.user.isVerified === true &&
    (session.user.role === "USER" || session.user.role === "TENANT") &&
    isVerificationRoute
  ) {
    if (session.user.role === "TENANT") return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_AS_TENANT, nextUrl));

    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_AS_USER, nextUrl));
  }

  if (
    isLoggedIn &&
    session?.user.isVerified === false &&
    isUserRoute
  ) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_AS_USER, nextUrl));
  }

  if (
    isLoggedIn &&
    (session?.user.isVerified === true || session?.user.isVerified === false) &&
    session.user.role === "USER" &&
    (isTenantRoute || isAuthRoute)
  ) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_AS_USER, nextUrl));
  }

  if (!isLoggedIn && (isUserRoute || isVerificationRoute || isTenantRoute || isBothRoute)) {
    return Response.redirect(new URL("/signin", nextUrl))
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
