import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export const revalidate = 0;

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default async function EarlyMembersPage() {
  const supabase = await createClient();
  const { data: applications } = await supabase
    .from('early_member_applications')
    .select('*')
    .order('created_at', { ascending: false });

  const total = applications?.length || 0;
  const pending = applications?.filter((a) => a.status === 'pending').length || 0;
  const approved = applications?.filter((a) => a.status === 'approved').length || 0;

  return (
    <main className="max-w-[1200px] mx-auto px-6 py-16">
      <Link
        href="/admin"
        className="inline-block text-[12px] font-semibold tracking-[0.14em] mb-8 transition-opacity hover:opacity-70"
        style={{ color: '#8a8a8a' }}
      >
        ← BACK TO ADMIN
      </Link>

      <h1
        className="text-[40px] font-extrabold -tracking-[0.02em] leading-[1.1] mb-2"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        Early Member Applications
      </h1>
      <p className="text-[14px] mb-10" style={{ color: '#8a8a8a' }}>
        Submitted while the site is in private/early-access mode.
      </p>

      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="rounded-[14px] p-6 border" style={{ background: '#141414', borderColor: 'rgba(255,255,255,0.05)' }}>
          <div className="text-[11px] font-semibold tracking-[0.14em] mb-1.5" style={{ color: '#8a8a8a' }}>TOTAL</div>
          <div className="text-[32px] font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{total}</div>
        </div>
        <div className="rounded-[14px] p-6 border" style={{ background: '#141414', borderColor: 'rgba(255,255,255,0.05)' }}>
          <div className="text-[11px] font-semibold tracking-[0.14em] mb-1.5" style={{ color: '#8a8a8a' }}>PENDING</div>
          <div className="text-[32px] font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{pending}</div>
        </div>
        <div className="rounded-[14px] p-6 border" style={{ background: '#141414', borderColor: 'rgba(255,255,255,0.05)' }}>
          <div className="text-[11px] font-semibold tracking-[0.14em] mb-1.5" style={{ color: '#8a8a8a' }}>APPROVED</div>
          <div className="text-[32px] font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{approved}</div>
        </div>
      </div>

      {total === 0 ? (
        <div
          className="rounded-[14px] p-12 text-center border"
          style={{ background: '#141414', borderColor: 'rgba(255,255,255,0.05)' }}
        >
          <p style={{ color: '#8a8a8a' }}>No applications yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((a) => (
            <Link
              key={a.id}
              href={`/admin/early-members/${a.id}`}
              className="block rounded-[14px] p-6 border transition-colors hover:border-white/20"
              style={{ background: '#141414', borderColor: 'rgba(255,255,255,0.05)' }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-[18px] font-bold mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {a.full_name}
                  </h3>
                  <div className="text-[13px] flex flex-wrap gap-x-4 gap-y-1" style={{ color: '#8a8a8a' }}>
                    <span>{a.email}</span>
                    {a.phone && <span>{a.phone}</span>}
                    {a.website_or_social && <span>{a.website_or_social}</span>}
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div
                    className="inline-block text-[10px] font-semibold tracking-[0.14em] px-3 py-1 rounded-full uppercase"
                    style={{
                      background: a.status === 'approved' ? 'rgba(34,197,94,0.15)' : a.status === 'rejected' ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.06)',
                      color: a.status === 'approved' ? '#4ade80' : a.status === 'rejected' ? '#f87171' : '#a0a0a0',
                    }}
                  >
                    {a.status || 'pending'}
                  </div>
                  <div className="text-[11px] mt-2" style={{ color: '#666' }}>
                    {formatDate(a.created_at)}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
