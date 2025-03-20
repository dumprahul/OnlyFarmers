// src/app/dashboard/page.tsx or src/app/home/page.tsx
import YourComponent from '../../components/Contract';
import Contract from '../../components/Contract';

export default function Page() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">SimpleStorage Contract</h1>
      <YourComponent/>
    </div>
  );
}