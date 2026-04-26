import { createClient } from '@/lib/supabase/server';
import EarlyMemberSplash from './components/EarlyMemberSplash';

export const revalidate = 0;

export default async function Home() {
  const supabase = await createClient();
  const { data: logoSetting } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'splash_logo_image')
    .single();

  const logoUrl = logoSetting?.value || '';

  return <EarlyMemberSplash logoUrl={logoUrl} />;
}
