import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { auth as authSession } from "./auth"

import {
  publicRoute,
  authRoute,
  userRoute,
  DEFAULT_LOGIN_REDIRECT_AS_USER
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

  if (isAuthRoute && isLoggedIn) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_AS_USER, nextUrl));
  }

  if (!isLoggedIn && isUserRoute) {
    return Response.redirect(new URL("/signin", nextUrl))
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
