import { Suspense } from 'react';
import TravelDetail from '@/components/TravelDetail';

export default async function TravelDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params; // Await the params to access id
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TravelDetail id={id} />
    </Suspense>
  );
}