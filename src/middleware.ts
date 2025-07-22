import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // 中间件逻辑可以在这里添加
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/generator/:path*",
  ],
};
