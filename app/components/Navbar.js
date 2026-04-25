import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import NavLinks from './NavLinks';
import NavbarVisibility from './NavbarVisibility';

export default async function Navbar() {
  const supabase = await createClient();
  const { data: logoSetting } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'logo_url')
    .single();

  const logoUrl = logoSetting?.value || '';

  return (
    <NavbarVisibility>
      <div className="flex justify-center pt-6 md:pt-8 px-4 md:px-6">
        <nav className="flex items-center justify-between w-full max-w-[1100px]">
          <Link href="/home" className="flex items-center">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Stardust Garage"
                className="w-auto object-contain h-[42px] md:h-[55px]"
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
    </NavbarVisibility>
  );
}
