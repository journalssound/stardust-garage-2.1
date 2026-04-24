import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import RotatingHeader from '../components/RotatingHeader';

export const revalidate = 0;

const features = [
  {
    title: 'Atmosphere',
    desc: 'Reliable, rapid internet. Couches, tables, nooks, and more — all places for you to feel at home while you deep dive into your work.',
    icon: 'wifi',
  },
  {
    title: 'Bar & AI Vending Machine',
    desc: 'We have an assortment of curated beverages to choose from, including coffee, kava, kanna, thc-a, cacao, plant-based protein shakes, organic juices, & more.',
    icon: 'coffee',
  },
  {
    title: 'Coworking Only Experiences',
    desc: 'Bi-weekly Coworking Membership access-only experiences.',
    icon: 'music',
  },
  {
    title: 'Curated Access',
    desc: 'Access is limited and intentional. Members bring guests selectively. We prioritize alignment over volume.',
    icon: 'users',
  },
  {
    title: 'Who This Is For',
    desc: 'SDG is a sacred and conscious space for creatives committed to depth, intention, and real-world creation.',
    icon: 'compass',
  },
];

function Icon({ name }) {
  const common = {
    width: 40,
    height: 40,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    style: { marginBottom: 24 },
  };
  if (name === 'wifi') {
    return (
      <svg {...common}>
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <line x1="12" y1="20" x2="12.01" y2="20" />
      </svg>
    );
  }
  if (name === 'coffee') {
    return (
      <svg {...common}>
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    );
  }
  if (name === 'music') {
    return (
      <svg {...common}>
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    );
  }
  if (name === 'compass') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export default async function CoworkPage() {
  const supabase = await createClient();
  const { data: images } = await supabase
    .from('gallery_images')
    .select('*')
    .eq('gallery_key', 'cowork_header')
    .order('sort_order', { ascending: true });

  return (
    <>
      <RotatingHeader images={images || []} />

      {/* Apply-to-be-a-member CTA */}
      <div className="px-4 md:px-0 mt-6">
        <div className="max-w-[1100px] mx-auto">
          <Link
            href="/members/apply/cowork"
            className="group relative block w-full overflow-hidden rounded-[18px] border transition-all hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
              borderColor: 'rgba(255,255,255,0.12)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
            }}
          >
            <div className="flex items-center justify-between px-7 md:px-10 py-5 md:py-6">
              <div>
                <div className="text-[11px] font-semibold tracking-[0.2em] mb-1" style={{ color: '#666' }}>
                  COWORK MEMBERSHIP
                </div>
                <div
                  className="text-[22px] md:text-[26px] font-extrabold -tracking-[0.02em] leading-[1.1]"
                  style={{ color: '#0a0a0a', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Apply to be a member
                </div>
              </div>
              <div
                className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] flex-shrink-0 ml-4"
                style={{ color: '#0a0a0a' }}
              >
                <span className="hidden sm:inline">APPLY NOW</span>
                <span
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full transition-transform group-hover:translate-x-1"
                  style={{ background: '#0a0a0a', color: '#ffffff' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <main className="max-w-[1100px] mx-auto px-4 md:px-6 py-14 md:py-20">
        <h1 className="text-[36px] md:text-[52px] font-extrabold -tracking-[0.02em] mb-[14px] md:mb-[18px] leading-[1.1]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          COWORK SPACE
        </h1>
        <p className="text-base leading-[1.55] max-w-[680px] mb-10 md:mb-14" style={{ color: '#8a8a8a' }}>
          For creators, builders, artists, and deep thinkers. SDG is a workspace for people who don&apos;t separate how they live, connect, and express themselves.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-[14px] p-7 md:p-9 border transition-transform hover:-translate-y-1"
              style={{ background: '#141414', borderColor: 'rgba(255,255,255,0.05)' }}
            >
              <Icon name={f.icon} />
              <h3 className="text-[19px] font-bold mb-2.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {f.title}
              </h3>
              <p className="text-sm leading-[1.55]" style={{ color: '#8a8a8a' }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
