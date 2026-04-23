import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
  '/student(.*)', 
  '/administrator(.*)', 
  '/societyhead(.*)'
])

// Next.js 16 looks for a default export or a named 'proxy' export.
// We wrap Clerk's logic inside the standard 'proxy' function.
export default function proxy(req: any, evt: any) {
  return clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) {
      await auth.protect()
    }
  })(req, evt)
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}