'use client';

import { usePathname } from 'next/navigation';

export default function NavbarVisibility({ children }) {
  const pathname = usePathname();

  // Hide navbar on the splash page (root /)
  if (pathname === '/') {
    return null;
  }

  return children;
}
