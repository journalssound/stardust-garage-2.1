'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

const links = [
  { href: '/events', label: 'EVENTS' },
  { href: '/cowork', label: 'COWORK' },
  { href: '/members', label: 'MEMBERS' },
  { href: '/venue-rental', label: 'VENUE RENTAL' },
  {
    label: 'COLLABORATE',
    href: '/collaborate',
    dropdown: [
      { href: '/collaborate/djs', label: 'DJs' },
      { href: '/collaborate/artists', label: 'Artists' },
    ],
  },
  { href: '/about', label: 'ABOUT' },
];

export default function NavLinks() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <ul className="flex gap-9 list-none items-center">
      {links.map((link) => {
        if (link.dropdown) {
          const isOpen = openDropdown === link.label;
          const isDropdownActive = link.dropdown.some((d) => isActive(d.href));
          return (
            <li key={link.label} className="relative" ref={isOpen ? dropdownRef : null}>
              <button
                type="button"
                onClick={() => setOpenDropdown(isOpen ? null : link.label)}
                className="text-[13px] font-medium tracking-[0.12em] transition-colors flex items-center gap-1.5"
                style={{ color: isDropdownActive || isOpen ? '#f5f5f5' : '#8a8a8a' }}
              >
                {link.label}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {isOpen && (
                <div
                  className="absolute top-full right-0 mt-3 rounded-[12px] border overflow-hidden min-w-[160px]"
                  style={{
                    background: '#141414',
                    borderColor: 'rgba(255,255,255,0.1)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                  }}
                >
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className="block px-5 py-3 text-[13px] font-medium tracking-[0.08em] transition-colors hover:bg-white/5"
                      style={{ color: isActive(item.href) ? '#f5f5f5' : '#c0c0c0' }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          );
        }

        return (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[13px] font-medium tracking-[0.12em] transition-colors"
              style={{ color: isActive(link.href) ? '#f5f5f5' : '#8a8a8a' }}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
