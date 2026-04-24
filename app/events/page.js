import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export const revalidate = 0;

function formatEventDate(dateString) {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatShortDate(dateString) {
  const date = new Date(dateString + 'T00:00:00');
  return {
    month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    day: date.getDate(),
  };
}

export default async function EventsPage() {
  const supabase = await createClient();

  const { data: events } = await supabase
    .from('events')
    .select('*')
    .order('event_date', { ascending: true });

  const eventList = events || [];

  // Split into upcoming and past based on today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcoming = eventList.filter((e) => new Date(e.event_date + 'T00:00:00') >= today);
  const past = eventList.filter((e) => new Date(e.event_date + 'T00:00:00') < today);

  return (
    <main className="max-w-[900px] mx-auto px-6 py-16">
      <h1
        className="text-[52px] font-extrabold -tracking-[0.02em] mb-3 leading-[1.1]"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        Upcoming Events
      </h1>
      <p className="text-[15px] leading-[1.55] mb-12" style={{ color: '#8a8a8a' }}>
        All upcoming parties, showcases, and experiences at Stardust Garage.
      </p>

      {upcoming.length === 0 ? (
        <div
          className="rounded-[14px] p-12 text-center border"
          style={{ background: '#141414', borderColor: 'rgba(255,255,255,0.05)' }}
        >
          <p style={{ color: '#8a8a8a' }}>No upcoming events right now. Check back soon.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {upcoming.map((event) => {
            const { month, day } = formatShortDate(event.event_date);
            return (
              <div
                key={event.id}
                className="relative rounded-[14px] border overflow-hidden transition-all hover:-translate-y-0.5"
                style={{ background: '#141414', borderColor: 'rgba(255,255,255,0.05)' }}
              >
                <div className="grid md:grid-cols-[180px_1fr] gap-0">
                  <Link href={`/events/${event.slug}`} className="block relative bg-[#1a1a1a]" style={{ minHeight: 220 }}>
                    {event.image_url ? (
                      <img src={event.image_url} alt={event.title} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-[11px] font-semibold tracking-[0.16em] mb-1" style={{ color: '#666' }}>{month}</div>
                          <div className="text-[40px] font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{day}</div>
                        </div>
                      </div>
                    )}
                  </Link>

                  <div className="p-7 flex flex-col justify-between">
                    <div>
                      <div className="text-[12px] font-semibold tracking-[0.14em] mb-3" style={{ color: '#8a8a8a' }}>
                        {formatEventDate(event.event_date)}
                        {event.event_time && <span> · {event.event_time}</span>}
                      </div>
                      <Link href={`/events/${event.slug}`}>
                        <h3 className="text-[24px] md:text-[28px] font-bold -tracking-[0.01em] mb-3 leading-[1.1] hover:opacity-80 transition-opacity" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          {event.title}
                        </h3>
                      </Link>
                      {event.description && (
                        <p className="text-[14px] leading-[1.55] line-clamp-2" style={{ color: '#a0a0a0' }}>
                          {event.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3 mt-5 flex-wrap">
                      {event.ticket_url ? (
                        <a
                          href={event.ticket_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2.5 rounded-full text-[11px] font-semibold tracking-[0.14em] hover:bg-gray-200 transition-colors"
                          style={{ background: '#ffffff', color: '#0a0a0a' }}
                        >
                          BUY TICKETS
                        </a>
                      ) : (
                        <span className="px-5 py-2.5 rounded-full text-[11px] font-semibold tracking-[0.14em] border" style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#a0a0a0' }}>
                          PRIVATE EVENT
                        </span>
                      )}
                      <Link
                        href={`/events/${event.slug}`}
                        className="px-5 py-2.5 rounded-full text-[11px] font-semibold tracking-[0.14em] border transition-colors hover:bg-white/5"
                        style={{ borderColor: 'rgba(255,255,255,0.15)', color: '#f5f5f5' }}
                      >
                        DETAILS
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {past.length > 0 && (
        <div className="mt-24">
          <h2
            className="text-[28px] font-extrabold -tracking-[0.02em] mb-8 leading-[1.1]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Past Events
          </h2>
          <div className="space-y-3">
            {past.slice(0, 10).map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.slug}`}
                className="block rounded-[14px] border p-5 transition-colors hover:border-white/15"
                style={{ background: '#141414', borderColor: 'rgba(255,255,255,0.05)', opacity: 0.7 }}
              >
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-[10px] overflow-hidden flex-shrink-0 bg-[#1a1a1a]">
                    {event.image_url && <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] mb-1" style={{ color: '#8a8a8a' }}>
                      {formatEventDate(event.event_date)}
                    </div>
                    <h3 className="text-[16px] font-bold truncate" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {event.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
