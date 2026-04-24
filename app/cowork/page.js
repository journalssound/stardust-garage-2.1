import { createClient } from '@/lib/supabase/server';
import RotatingHeader from '../components/RotatingHeader';

export const revalidate = 0;

const features = [
  { title: 'High-Speed Internet', desc: '1,000mbps of lightning-fast & reliable internet.', icon: 'wifi' },
  { title: 'Bar & AI Vending Machine', desc: 'We have an assortment of curated beverages to choose from, including coffee, kava, kanna, thc-a, cacao, plant-based protein shakes, organic juices, & more.', icon: 'coffee' },
  { title: 'Cozy AF', desc: "Most likely the coziest place you've ever been to outside of your own living room.", icon: 'music' },
  { title: 'Curated Access', desc: 'Coworking hours are explicitly for Members and their limited number of guests. All guests are subject to approval by staff because this is a Community House and we want you to feel at home every time you step through our doors.', icon: 'users' },
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
      <RotatingHeader images={images || []}>
        <div className="text-[24px] md:text-[30px] font-bold -tracking-[0.01em]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Cowork
        </div>
      </RotatingHeader>

      <main className="max-w-[1100px] mx-auto px-4 md:px-6 py-14 md:py-20">
        <h1 className="text-[36px] md:text-[52px] font-extrabold -tracking-[0.02em] mb-[14px] md:mb-[18px] leading-[1.1]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          COWORK SPACE
        </h1>
        <p className="text-base leading-[1.55] max-w-[620px] mb-10 md:mb-14" style={{ color: '#8a8a8a' }}>
          A creative workspace for musicians, artists, and remote workers who thrive in an inspiring environment.
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
