'use client';

import Link from 'next/link';
import { useState } from 'react';

const events = [
  { slug: 'neon-pulse', title: 'Neon Pulse', date: 'April 25, 2026', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80' },
  { slug: 'dj-sapphire', title: 'DJ Sapphire + Guests', date: 'April 30, 2026', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80' },
  { slug: 'velvet-pulse', title: 'Velvet Pulse + Guests', date: 'May 3, 2026', image: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800&q=80' },
  { slug: 'midnight-sessions', title: 'Midnight Sessions', date: 'May 10, 2026', image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80' },
  { slug: 'echo-chamber-live', title: 'Echo Chamber Live', date: 'May 17, 2026', image: 'https://images.unsplash.com/photo-1534329539061-64caeb388c42?w=800&q=80' },
  { slug: 'stardust-selects', title: 'Stardust Selects', date: 'May 24, 2026', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80' },
];

const waysWeDoIt = [
  { title: 'Work hard, play hard', desc: "M–F we offer the cowork experience that Creators and Builders like yourself have been craving. After working hours and weekends, we offer dance music experiences like you won't find anywhere in Austin." },
  { title: 'Presence First', desc: 'Our policy is "being where your feet are". We do not allow photography/videography on premises. This is born out of a philosophy of magnetism and human-connection.' },
  { title: 'State-of-the-Art Sound', desc: '4-point L-Acoustics Sound System. We hear many times on the dance floor "wtf this is the best sound I\'ve ever heard".' },
  { title: 'Legendary Atmosphere', desc: 'Quite possibly the coziest venue on planet earth. "It feels like I\'m in my living room."' },
];

function SignupForm() {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-[520px] mx-auto text-center">
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-6"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f5f5f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3
          className="text-[26px] font-bold mb-3 -tracking-[0.01em]"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          You&apos;re on the list
        </h3>
        <p className="text-[15px] leading-[1.6]" style={{ color: '#8a8a8a' }}>
          We&apos;ll be in touch with the next drop.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[520px] mx-auto text-center">
      <div
        className="inline-block text-[11px] font-semibold tracking-[0.2em] px-3.5 py-1.5 rounded-full mb-6"
        style={{
          color: '#8a8a8a',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        STAY IN THE LOOP
      </div>
      <h2
        className="text-[32px] md:text-[40px] font-extrabold -tracking-[0.02em] leading-[1.1] mb-4"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        Never miss a drop.
      </h2>
      <p className="text-[15px] leading-[1.55] mb-8 max-w-[420px] mx-auto" style={{ color: '#8a8a8a' }}>
        Get early access to events, parties, and members-only experiences.
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-2.5 max-w-[460px] mx-auto"
      >
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Email or phone number"
          className="flex-1 px-5 py-3.5 rounded-full text-[14px] outline-none border transition-colors focus:border-white/30"
          style={{
            background: '#141414',
            borderColor: 'rgba(255,255,255,0.1)',
            color: '#f5f5f5',
          }}
        />
        <button
          type="submit"
          className="px-7 py-3.5 rounded-full text-[12px] font-semibold tracking-[0.14em] transition-all hover:-translate-y-0.5 whitespace-nowrap"
          style={{ background: '#ffffff', color: '#0a0a0a' }}
        >
          NOTIFY ME
        </button>
      </form>
      <p className="text-[11px] mt-4" style={{ color: '#555' }}>
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="relative mx-auto max-w-[1100px] mt-6 rounded-[18px] overflow-hidden bg-[#111]" style={{ aspectRatio: '16 / 7.3' }}>
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

      {/* SIGNUP */}
      <section className="max-w-[1100px] mx-auto px-6 py-24">
        <SignupForm />
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14 px-[80px]">
            {waysWeDoIt.map((item) => (
              <div key={item.title} className="max-w-[480px]">
                <h3 className="text-[32px] font-extrabold -tracking-[0.02em] leading-[1.1] mb-[18px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {item.title}
                </h3>
                <p className="text-[15px] leading-[1.6]" style={{ color: '#555' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="max-w-[1100px] mx-auto px-6 py-24">
        <div className="mb-8 text-center">
          <div
            className="inline-block text-[11px] font-semibold tracking-[0.2em] px-3.5 py-1.5 rounded-full mb-4"
            style={{
              color: '#8a8a8a',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            FIND US
          </div>
          <h2
            className="text-[32px] md:text-[40px] font-extrabold -tracking-[0.02em] leading-[1.1] mb-3"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            4319 Terry-O Ln
          </h2>
          <p className="text-[15px]" style={{ color: '#8a8a8a' }}>
            Austin, TX 78745
          </p>
        </div>

        <div
          className="rounded-[18px] overflow-hidden border"
          style={{
            borderColor: 'rgba(255,255,255,0.08)',
            aspectRatio: '16 / 7',
          }}
        >
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=-97.8270%2C30.2110%2C-97.8070%2C30.2310&layer=mapnik&marker=30.2210%2C-97.8170"
            style={{ width: '100%', height: '100%', border: 0, filter: 'invert(0.9) hue-rotate(180deg) saturate(0.3)' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Stardust Garage location"
          />
        </div>

        <div className="mt-6 text-center">
          <a
            href="https://www.google.com/maps/search/?api=1&query=4319+Terry-O+Ln+Austin+TX+78745"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.12em] transition-opacity hover:opacity-70"
            style={{ color: '#f5f5f5' }}
          >
            GET DIRECTIONS
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}
