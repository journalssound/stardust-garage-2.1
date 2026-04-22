import Link from 'next/link';
import { notFound } from 'next/navigation';

const eventData = {
  'neon-pulse': {
    title: 'Neon Pulse',
    artist: 'Neon Pulse',
    date: 'April 25, 2026',
    price: '$35',
    location: 'Austin, Texas',
    venue: 'Stardust Garage',
    time: '10:00 PM',
    doorTime: '09:00 PM',
    prices: { online: '$35', retailers: '$40', onsite: '$42' },
    partners: 'EchoWave, SonicForge',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=2000&q=80',
  },
  'dj-sapphire': {
    title: 'DJ Sapphire + Guests',
    artist: 'DJ Sapphire',
    date: 'October 18, 2026',
    price: '$40',
    location: 'Warszawa, Poland',
    venue: 'Halle Torwar',
    time: '09:00 PM',
    doorTime: '08:00 PM',
    prices: { online: '$40', retailers: '$45', onsite: '$47' },
    partners: 'EchoWave, SonicForge, RhythmPulse',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=2000&q=80',
  },
  'velvet-pulse': {
    title: 'Velvet Pulse + Guests',
    artist: 'Velvet Pulse',
    date: 'May 3, 2026',
    price: '$45',
    location: 'Austin, Texas',
    venue: 'Stardust Garage',
    time: '11:00 PM',
    doorTime: '10:00 PM',
    prices: { online: '$45', retailers: '$50', onsite: '$55' },
    partners: 'EchoWave, RhythmPulse',
    image: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=2000&q=80',
  },
  'midnight-sessions': {
    title: 'Midnight Sessions',
    artist: 'Various Artists',
    date: 'May 10, 2026',
    price: '$30',
    location: 'Austin, Texas',
    venue: 'Stardust Garage',
    time: '11:00 PM',
    doorTime: '10:00 PM',
    prices: { online: '$30', retailers: '$35', onsite: '$37' },
    partners: 'SonicForge',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=2000&q=80',
  },
  'echo-chamber-live': {
    title: 'Echo Chamber Live',
    artist: 'Echo Chamber',
    date: 'May 17, 2026',
    price: '$38',
    location: 'Austin, Texas',
    venue: 'Stardust Garage',
    time: '09:30 PM',
    doorTime: '08:30 PM',
    prices: { online: '$38', retailers: '$42', onsite: '$45' },
    partners: 'EchoWave',
    image: 'https://images.unsplash.com/photo-1534329539061-64caeb388c42?w=2000&q=80',
  },
  'stardust-selects': {
    title: 'Stardust Selects',
    artist: 'House DJs',
    date: 'May 24, 2026',
    price: '$25',
    location: 'Austin, Texas',
    venue: 'Stardust Garage',
    time: '10:00 PM',
    doorTime: '09:00 PM',
    prices: { online: '$25', retailers: '$30', onsite: '$32' },
    partners: 'RhythmPulse, EchoWave',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=2000&q=80',
  },
};

export default async function EventPage({ params }) {
  const { slug } = await params;
  const event = eventData[slug];

  if (!event) {
    notFound();
  }

  return (
    <main className="max-w-[1100px] mx-auto px-6 py-10">
      <div className="flex gap-2.5 text-[11px] font-semibold tracking-[0.14em] uppercase mb-7" style={{ color: '#8a8a8a' }}>
        <Link href="/" className="hover:text-white">HOME</Link>
        <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
        <Link href="/" className="hover:text-white">EVENTS</Link>
        <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
        <span style={{ color: '#f5f5f5' }}>{event.title.toUpperCase()}</span>
      </div>

      <div className="w-full rounded-[14px] overflow-hidden mb-12 bg-[#111]" style={{ aspectRatio: '16 / 7' }}>
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
      </div>

      <div className="grid gap-16" style={{ gridTemplateColumns: '300px 1fr' }}>
        <aside>
          <h2 className="text-[32px] font-extrabold -tracking-[0.02em] mb-1.5 leading-[1.1]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {event.artist}
          </h2>
          <div className="text-[22px] font-bold -tracking-[0.01em] mb-5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {event.date}
          </div>
          <a href="#" className="inline-block bg-white text-[#0a0a0a] px-[22px] py-2.5 rounded-full text-[13px] font-bold tracking-[0.08em] mb-8 hover:bg-gray-200 transition-colors">
            TICKETS {event.price}
          </a>

          <div className="py-5 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="text-[13px] font-bold mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Location</div>
            <div className="text-sm leading-[1.6]" style={{ color: '#8a8a8a' }}>{event.location}</div>
          </div>
          <div className="py-5 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="text-[13px] font-bold mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Venue</div>
            <div className="text-sm leading-[1.6]" style={{ color: '#8a8a8a' }}>{event.venue}</div>
          </div>
          <div className="py-5 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="text-[13px] font-bold mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Time</div>
            <div className="text-sm leading-[1.6]" style={{ color: '#8a8a8a' }}>
              <p>{event.time}</p>
              <p>Door: {event.doorTime}</p>
            </div>
          </div>
          <div className="py-5 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="text-[13px] font-bold mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Price</div>
            <div className="text-sm leading-[1.6]" style={{ color: '#8a8a8a' }}>
              <p>Online Price: {event.prices.online}</p>
              <p>Retailers: {event.prices.retailers}</p>
              <p>On Site: {event.prices.onsite}</p>
            </div>
          </div>
          <div className="py-5 border-t border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="text-[13px] font-bold mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Partners</div>
            <div className="text-sm leading-[1.6]" style={{ color: '#8a8a8a' }}>{event.partners}</div>
          </div>
        </aside>

        <section>
          <h1 className="text-[40px] font-extrabold -tracking-[0.02em] mb-7 leading-[1.1]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {event.title}
          </h1>
          <p className="text-[15px] leading-[1.7] mb-[22px]">
            Experience an unforgettable night of music and energy at {event.title}, where creativity meets passion on stage. Join us as we bring together a lineup of renowned artists, immersive performances, and an electric atmosphere that will leave you wanting more. Prepare to be transported into a world of sound, light, and emotions, crafted with the sole purpose of making this event a standout in your memory.
          </p>
          <p className="text-[15px] leading-[1.7] mb-[22px]">
            Whether you&apos;re here for the music, the community, or simply to enjoy an incredible night out, this event promises to deliver an experience like no other. From high-energy beats to intimate acoustic sessions, this event caters to all music lovers. Expect an unparalleled lineup of talent, breathtaking visuals, and a night filled with unforgettable moments. Secure your tickets now, and be part of a night that will resonate long after the final encore.
          </p>
        </section>
      </div>
    </main>
  );
}
