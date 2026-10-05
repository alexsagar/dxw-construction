import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFoundPage() {
  return (
    <div className="py-24 text-center space-y-4">
      <h1 className="text-3xl font-bold text-neutral-900">404 - Page Not Found</h1>
      <p className="text-neutral-600">The requested page could not be found.</p>
      <div className="pt-4">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
