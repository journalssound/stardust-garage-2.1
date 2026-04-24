import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import SignupForm from './components/SignupForm';
import EventCard from './components/EventCard';

const waysWeDoIt = [
  { title: 'Work hard, play hard', desc: "M–F we offer the cowork experience that Creators and Builders like yourself have been craving. After working hours and weekends, we offer dance music experiences like you won't find anywhere in Austin." },
  { title: 'Presence First', desc: 'Our policy is "being where your feet are". We do not allow photography/videography on premises. This is born out of a philosophy of magnetism and human-connection.' },
  { title: 'State-of-the-Art Sound', desc: '4-point L-Acoustics Sound System. We hear many times on the dance floor "wtf this is the best sound I\'ve ever heard".' },
  { title: 'Legendary Atmosphere', desc: 'Quite possibly the coziest venue on planet earth. "It feels like I\'m in my living room."' },
];

export const revalidate = 0;

async function getSetting(supabase, key) {
  const { data } = await supabase.from('site_settings').select('value').eq('key', key).single();
  return data?.value || '';
}

export default async function HomePage() {
  const supabase = await createClient();

  const [heroImage, heroDate, heroTitle, coworkCardImage, eventsCardImage, eventsResult] = await Promise.all([
    getSetting(supabase, 'homepage_hero_image'),
    getSetting(supabase, 'homepage_hero_date'),
    getSetting(supabase, 'homepage_hero_title'),
    getSetting(supabase, 'homepage_card_cowork_image'),
    getSetting(supabase, 'homepage_card_events_image'),
    supabase.from('events').select('*').order('event_date', { ascending: true }),
  ]);

  const eventList = eventsResult.data || [];

  return (
    <>
      {/* HERO */}
      <div className="px-12 md:px-20 mt-12 mb-16">
        <section
          className="relative mx-auto max-w-[1180px] rounded-[20px] overflow-hidden bg-[#111]"
          style={{ aspectRatio: '16 / 7' }}
        >
          {heroImage && (
            <img
              src={heroImage}
              alt={heroTitle || 'Stardust Garage'}
              className="absolute inset-0 w-full h-full object-cover brightness-75"
            />
          )}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 45%)' }} />
          <div className="absolute left-10 bottom-9 text-white">
            {heroDate && (
              <div className="text-xs font-medium tracking-[0.16em] mb-3.5 opacity-85">{heroDate}</div>
            )}
            {heroTitle && (
              <div className="text-[30px] font-bold -tracking-[0.01em]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {heroTitle}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* TWO-CARD EXPLORER */}
      <section className="px-12 md:px-20 mb-24">
        <div className="max-w-[1180px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/cowork"
            className="group relative overflow-hidden rounded-[20px] bg-[#111] transition-transform hover:-translate-y-1"
            style={{ aspectRatio: '4 / 5' }}
          >
            {coworkCardImage ? (
              <img
                src={coworkCardImage}
                alt="Cowork"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ filter: 'brightness(0.7)' }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: '#1a1a1a' }}>
                <span className="text-[11px] font-semibold tracking-[0.2em]" style={{ color: '#555' }}>
                  UPLOAD IMAGE IN ADMIN
                </span>
              </div>
            )}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0) 100%)' }} />
            <div className="absolute left-8 bottom-8 right-8 text-white">
              <div className="text-[11px] font-semibold tracking-[0.2em] mb-3 opacity-85">SPACE</div>
              <div className="text-[44px] font-extrabold -tracking-[0.02em] leading-[1]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Cowork
              </div>
              <div className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em]">
                EXPLORE
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
          </Link>

          <Link
            href="/events"
            className="group relative overflow-hidden rounded-[20px] bg-[#111] transition-transform hover:-translate-y-1"
            style={{ aspectRatio: '4 / 5' }}
          >
            {eventsCardImage ? (
              <img
                src={eventsCardImage}
                alt="Events"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ filter: 'brightness(0.7)' }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: '#1a1a1a' }}>
                <span className="text-[11px] font-semibold tracking-[0.2em]" style={{ color: '#555' }}>
                  UPLOAD IMAGE IN ADMIN
                </span>
              </div>
            )}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0) 100%)' }} />
            <div className="absolute left-8 bottom-8 right-8 text-white">
              <div className="text-[11px] font-semibold tracking-[0.2em] mb-3 opacity-85">NIGHTLIFE</div>
              <div className="text-[44px] font-extrabold -tracking-[0.02em] leading-[1]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Events
              </div>
              <div className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em]">
                EXPLORE
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* STAY IN THE LOOP */}
      <section className="py-16 px-6" style={{ background: '#e9e9e7', color: '#0a0a0a' }}>
        <SignupForm />
      </section>

      {/* UPCOMING EVENTS GRID */}
      <section className="max-w-[1100px] mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-[15px] font-bold tracking-[0.12em]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            UPCOMING EVENTS
          </h2>
          <Link
            href="/events"
            className="text-[12px] font-semibold tracking-[0.14em] transition-opacity hover:opacity-70 flex items-center gap-1.5"
            style={{ color: '#8a8a8a' }}
          >
            VIEW ALL
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {eventList.length === 0 ? (
          <p style={{ color: '#8a8a8a' }}>No upcoming events right now. Check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px]">
            {eventList.slice(0, 3).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>

      {/* OUR WAY OF DOING IT */}
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
            St. Elmo Arts District
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

      {/* CONTACT */}
      <section className="py-24 px-12" style={{ background: '#e9e9e7', color: '#0a0a0a' }}>
        <div className="max-w-[1400px] mx-auto px-[80px]">
          <h2
            className="text-[44px] font-extrabold -tracking-[0.02em] leading-[1.1] mb-16"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Contact
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div>
              <h3 className="text-[20px] font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Email
              </h3>
              <a href="mailto:hello@sdgatx.com" className="text-[15px] hover:underline" style={{ color: '#333' }}>
                hello@sdgatx.com
              </a>

              <h3 className="text-[20px] font-bold mt-8 mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                WhatsApp
              </h3>
              <a href="https://wa.me/17373086685" target="_blank" rel="noopener noreferrer" className="text-[15px] hover:underline" style={{ color: '#333' }}>
                1-737-308-6685
              </a>
            </div>

            <div>
              <h3 className="text-[20px] font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Address
              </h3>
              <p className="text-[15px]" style={{ color: '#333' }}>
                4319 Terry-O Ln<br />
                Austin, TX 78745
              </p>

              <h3 className="text-[20px] font-bold mt-8 mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Opening Hours
              </h3>
              <div className="text-[15px] space-y-1.5" style={{ color: '#333' }}>
                <p>Mon–Fri: 8 AM – 6 PM</p>
                <p>Wknd Nights: (check schedule)</p>
                <p>Sun: Open for Events (check schedule)</p>
              </div>

              <h3 className="text-[20px] font-bold mt-8 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Follow Us
              </h3>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:-translate-y-0.5"
                  style={{ background: '#0a0a0a', color: '#ffffff' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:-translate-y-0.5"
                  style={{ background: '#0a0a0a', color: '#ffffff' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.5 6.5c-.3-1-1-1.8-2-2C19.5 4 12 4 12 4s-7.5 0-9.5.5c-1 .3-1.8 1-2 2C0 8.5 0 12 0 12s0 3.5.5 5.5c.3 1 1 1.8 2 2C4.5 20 12 20 12 20s7.5 0 9.5-.5c1-.3 1.8-1 2-2 .5-2 .5-5.5.5-5.5s0-3.5-.5-5.5zM9.5 15.5v-7l6 3.5-6 3.5z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <form className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-transparent border-b pb-2 text-[14px] outline-none focus:border-black transition-colors"
                    style={{ borderColor: 'rgba(0,0,0,0.25)', color: '#0a0a0a' }}
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full bg-transparent border-b pb-2 text-[14px] outline-none focus:border-black transition-colors"
                    style={{ borderColor: 'rgba(0,0,0,0.25)', color: '#0a0a0a' }}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full bg-transparent border-b pb-2 text-[14px] outline-none focus:border-black transition-colors"
                  style={{ borderColor: 'rgba(0,0,0,0.25)', color: '#0a0a0a' }}
                />
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="w-full bg-transparent border-b pb-2 text-[14px] outline-none focus:border-black transition-colors resize-none"
                  style={{ borderColor: 'rgba(0,0,0,0.25)', color: '#0a0a0a' }}
                />
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full text-[12px] font-semibold tracking-[0.16em] transition-all hover:-translate-y-0.5"
                  style={{ background: '#0a0a0a', color: '#ffffff' }}
                >
                  SEND
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
