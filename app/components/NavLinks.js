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

export default function NavLinks() {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === '/') return pathname === '/' || pathname.startsWith('/events');
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
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
  );
}
