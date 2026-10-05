import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for Next.js internals, API routes, and static files with extensions
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
