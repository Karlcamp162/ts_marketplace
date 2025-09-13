import Header from '@/components/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex items-center justify-center h-[calc(100vh-60px)]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Marketplace</h1>
          <p className="text-gray-600 mb-8">Connect with friends and the world around you</p>
          <div className="space-y-4">
            <a 
              href="/marketplace" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Marketplace
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}