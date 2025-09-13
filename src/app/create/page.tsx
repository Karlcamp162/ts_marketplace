import Header from '@/components/Header';
import CreateListingForm from '@/components/CreateListingForm';

export default function CreateListingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-6">
        <CreateListingForm />
      </div>
    </div>
  );
}
