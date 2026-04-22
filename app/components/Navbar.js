'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'EVENTS' },
  { href: '/cowork', label: 'COWORK' },
  { href: '/members', label: 'MEMBERS' },
  { href: '/venue-rental', label: 'VENUE RENTAL' },
  { href: '/about', label: 'ABOUT' },
];

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === '/') return pathname === '/' || pathname.startsWith('/events');
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <div className="flex justify-center pt-5 px-6">
      <nav
        className="flex items-center justify-between w-full max-w-[1100px] rounded-full px-9 py-5 border"
        style={{ background: '#141414', borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <Link
          href="/"
          className="font-bold text-[15px] tracking-[0.12em] text-white"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          STARDUST GARAGE
        </Link>
        <ul className="flex gap-11 list-none">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[13px] font-medium tracking-[0.12em] transition-colors"
                style={{ color: isActive(link.href) ? '#f5f5f5' : '#8a8a8a' }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
