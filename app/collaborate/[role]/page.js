import { notFound } from 'next/navigation';
import CollaborateForm from './CollaborateForm';

const ROLE_CONFIG = {
  'djs': {
    label: 'DJs',
    subtitle: 'For DJs looking to play at Stardust Garage',
  },
  'artists': {
    label: 'Artists',
    subtitle: 'For artists, performers, and creative collaborators',
  },
};

export default async function CollaboratePage({ params }) {
  const { role } = await params;
  const roleConfig = ROLE_CONFIG[role];

  if (!roleConfig) {
    notFound();
  }

  return <CollaborateForm role={role} roleLabel={roleConfig.label} roleSubtitle={roleConfig.subtitle} />;
}
