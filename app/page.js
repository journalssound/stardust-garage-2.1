import Link from 'next/link';

const events = [
  { slug: 'neon-pulse', title: 'Neon Pulse', date: 'April 25, 2026', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80' },
  { slug: 'dj-sapphire', title: 'DJ Sapphire + Guests', date: 'April 30, 2026', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80' },
  { slug: 'velvet-pulse', title: 'Velvet Pulse + Guests', date: 'May 3, 2026', image: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800&q=80' },
  { slug: 'midnight-sessions', title: 'Midnight Sessions', date: 'May 10, 2026', image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80' },
  { slug: 'echo-chamber-live', title: 'Echo Chamber Live', date: 'May 17, 2026', image: 'https://images.unsplash.com/photo-1534329539061-64caeb388c42?w=800&q=80' },
  { slug: 'stardust-selects', title: 'Stardust Selects', date: 'May 24, 2026', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80' },
];

const waysWeDoIt = [
  { title: 'State-of-the-Art Sound', desc: 'Experience a performance like never before, with cutting-edge acoustics designed for live music.', learnMore: true },
  { title: 'Iconic Atmosphere', desc: 'Our venue is renowned for its intimate setting that brings you closer to the artists you love.' },
  { title: 'Capacity & Flexibility', desc: "Whether it's a sold-out show for 500 or an intimate showcase, Stardust Garage adapts to create the perfect vibe." },
];

export default function HomePage() {
  return (
    <>
      <section className="relative mx-auto max-w-[1100px] mt-6 mb-20 rounded-[18px] overflow-hidden bg-[#111]" style={{ aspectRatio: '16 / 7.3' }}>
        <img
          src="https://images.unsplash.com/photo-1571266028243-d220c6a55fab?w=2000&q=80"
          alt="Basement Beats Showcase"
          className="absolute inset-0 w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 45%)' }} />
        <div className="absolute left-10 bottom-9 text-white">
          <div className="text-xs font-medium tracking-[0.16em] mb-3.5 opacity-85">MAY 3, 2026</div>
          <div className="text-[30px] font-bold -tracking-[0.01em]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Basement Beats Showcase
          </div>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-6 pb-32">
        <h2 className="text-[15px] font-bold tracking-[0.12em] mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          UPCOMING EVENTS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px]">
          {events.map((event) => (
            <Link key={event.slug} href={`/events/${event.slug}`} className="group block">
              <div className="relative overflow-hidden rounded-[14px] bg-[#1a1a1a] transition-transform group-hover:-translate-y-1" style={{ aspectRatio: '3 / 4' }}>
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                <span className="absolute top-[18px] right-[18px] bg-white text-[#0a0a0a] px-4 py-2 rounded-full text-[11px] font-semibold tracking-[0.12em]">
                  BUY TICKETS
                </span>
              </div>
              <div className="text-xs mt-4 mb-2" style={{ color: '#8a8a8a' }}>{event.date}</div>
              <h3 className="text-[17px] font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{event.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-24 px-12" style={{ background: '#e9e9e7', color: '#0a0a0a' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.16em] mb-16" style={{ marginLeft: '80px' }}>
            <span className="inline-block w-[7px] h-[7px] rounded-full" style={{ background: '#0a0a0a' }} />
            OUR WAY OF DOING IT
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 px-[80px]">
            {waysWeDoIt.map((item) => (
              <div key={item.title} className="max-w-[430px]">
                <div className="flex items-baseline gap-[18px] mb-[18px]">
                  <h3 className="text-[34px] font-extrabold -tracking-[0.02em] leading-[1.1]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {item.title}
                  </h3>
                  {item.learnMore && (
                    <a href="#" className="text-[11px] font-semibold tracking-[0.14em] whitespace-nowrap hover:underline">
                      (LEARN MORE)
                    </a>
                  )}
                </div>
                <p className="text-[15px] leading-[1.55]" style={{ color: '#555', maxWidth: '360px' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
