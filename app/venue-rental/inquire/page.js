import InquireForm from './InquireForm';

const INQUIRY_TYPE_LABELS = {
  'micro-parties': 'Micro Parties / Birthdays',
  'host-your-own': 'Host-Your-Own Experiences',
  'entire-space': 'Entire Space',
};

export default async function InquirePage({ searchParams }) {
  const params = await searchParams;
  const rawType = params?.type || '';
  const inquiryType = INQUIRY_TYPE_LABELS[rawType] ? rawType : '';
  const typeLabel = INQUIRY_TYPE_LABELS[inquiryType] || '';

  return <InquireForm inquiryType={inquiryType} typeLabel={typeLabel} />;
}
