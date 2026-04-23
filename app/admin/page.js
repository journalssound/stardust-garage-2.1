import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import LogoutButton from './components/LogoutButton';
import DeleteEventButton from './components/DeleteEventButton';

export const revalidate = 0;

function formatDate(dateString) {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .order('event_date', { ascending: true });

  return (
    <main className="max-w-[1100px] mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1
            className="text-[40px] font-extrabold -tracking-[0.02em] leading-[1.1]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Admin
          </h1>
          <p className="text-[14px] mt-2" style={{ color: '#8a8a8a' }}>
            Signed in as {user?.email}
          </p>
        </div>
        <LogoutButton />
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2
          className="text-[18px] font-bold tracking-[0.12em]"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          EVENTS
        </h2>
        <Link
          href="/admin/events/new"
          className="px-6 py-2.5 rounded-full text-[12px] font-semibold tracking-[0.14em] transition-all hover:-translate-y-0.5"
          style={{ background: '#ffffff', color: '#0a0a0a' }}
        >
          + NEW EVENT
        </Link>
      </div>

      {!events || events.length === 0 ? (
        <div
          className="rounded-[14px] p-12 text-center border"
          style={{ background: '#141414', borderColor: 'rgba(255,255,255,0.05)' }}
        >
          <p style={{ color: '#8a8a8a' }}>No events yet. Click &quot;+ NEW EVENT&quot; to create one.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="rounded-[14px] border p-5 flex items-center gap-5"
              style={{ background: '#141414', borderColor: 'rgba(255,255,255,0.05)' }}
            >
              <div
                className="w-20 h-20 rounded-[10px] overflow-hidden flex-shrink-0 bg-[#1a1a1a]"
              >
                {event.image_url && (
                  <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-[12px] mb-1" style={{ color: '#8a8a8a' }}>
                  {formatDate(event.event_date)}{event.event_time ? ` · ${event.event_time}` : ''}
                </div>
                <h3 className="text-[17px] font-bold truncate" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {event.title}
                </h3>
                <div className="text-[12px] mt-1" style={{ color: '#555' }}>
                  /events/{event.slug}
                </div>
              </div>

              <div className="flex gap-2 flex-shrink-0">
                <Link
                  href={`/admin/events/${event.id}`}
                  className="px-4 py-2 rounded-full text-[11px] font-semibold tracking-[0.12em] border transition-colors hover:bg-white/5"
                  style={{ borderColor: 'rgba(255,255,255,0.15)', color: '#f5f5f5' }}
                >
                  EDIT
                </Link>
                <DeleteEventButton eventId={event.id} eventTitle={event.title} />
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
