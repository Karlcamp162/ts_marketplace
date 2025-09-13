import Header from '@/components/Header';

export default function GamingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex items-center justify-center h-[calc(100vh-60px)]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Gaming</h1>
          <p className="text-gray-600">Gaming content coming soon...</p>
        </div>
      </div>
    </div>
  );
}
