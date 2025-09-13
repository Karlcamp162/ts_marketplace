import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Listing Not Found</h1>
        <p className="text-gray-600 mb-8">
          The listing you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/">
          <Button>Back to Marketplace</Button>
        </Link>
      </div>
    </div>
  );
}
