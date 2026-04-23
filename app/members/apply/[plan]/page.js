import { notFound } from 'next/navigation';
import ApplyForm from './ApplyForm';

const VALID_PLANS = {
  'cowork': { name: 'Cowork', price: '$155/mo' },
  'cowork-party': { name: 'Cowork + Party', price: '$225/mo' },
};

export default async function ApplyPage({ params }) {
  const { plan } = await params;
  const planInfo = VALID_PLANS[plan];

  if (!planInfo) {
    notFound();
  }

  return <ApplyForm planSlug={plan} planName={planInfo.name} planPrice={planInfo.price} />;
}
