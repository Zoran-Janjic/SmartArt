import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Allow public access to the following api endpoint
  publicRoutes: ["/api/webhooks(.*)"],
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
