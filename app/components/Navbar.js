import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import NavLinks from './NavLinks';

export default async function Navbar() {
  const supabase = await createClient();
  const { data: logoSetting } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'logo_url')
    .single();

  const logoUrl = logoSetting?.value || '';

  return (
    <div className="flex justify-center pt-8 px-6">
      <nav className="flex items-center justify-between w-full max-w-[1100px]">
        <Link href="/" className="flex items-center">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="Stardust Garage"
              className="h-10 w-auto object-contain"
            />
          ) : (
            <span
              className="font-bold text-[15px] tracking-[0.12em] text-white"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              STARDUST GARAGE
            </span>
          )}
        </Link>
        <NavLinks />
      </nav>
    </div>
  );
}
