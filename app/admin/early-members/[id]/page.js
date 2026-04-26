import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import EarlyMemberActions from './EarlyMemberActions';

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

function Field({ label, children }) {
  return (
    <div className="py-5 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="text-[11px] font-semibold tracking-[0.14em] mb-2" style={{ color: '#8a8a8a' }}>
        {label}
      </div>
      <div className="text-[15px] leading-[1.6]" style={{ whiteSpace: 'pre-wrap' }}>
        {children || <span style={{ color: '#555' }}>—</span>}
      </div>
    </div>
  );
}

export default async function EarlyMemberDetail({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: a, error } = await supabase
    .from('early_member_applications')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !a) notFound();

  return (
    <main className="max-w-[800px] mx-auto px-6 py-16">
      <Link
        href="/admin/early-members"
        className="inline-block text-[12px] font-semibold tracking-[0.14em] mb-8 transition-opacity hover:opacity-70"
        style={{ color: '#8a8a8a' }}
      >
        ← BACK TO EARLY MEMBERS
      </Link>

      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1
            className="text-[36px] font-extrabold -tracking-[0.02em] leading-[1.1] mb-2"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {a.full_name}
          </h1>
          <div className="text-[13px]" style={{ color: '#8a8a8a' }}>
            Submitted {formatDate(a.created_at)}
          </div>
        </div>

        <div
          className="flex-shrink-0 inline-block text-[10px] font-semibold tracking-[0.14em] px-3 py-1 rounded-full uppercase"
          style={{
            background: a.status === 'approved' ? 'rgba(34,197,94,0.15)' : a.status === 'rejected' ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.06)',
            color: a.status === 'approved' ? '#4ade80' : a.status === 'rejected' ? '#f87171' : '#a0a0a0',
          }}
        >
          {a.status || 'pending'}
        </div>
      </div>

      <EarlyMemberActions applicationId={a.id} currentStatus={a.status || 'pending'} />

      <section
        className="rounded-[14px] p-7 border mt-10"
        style={{ background: '#141414', borderColor: 'rgba(255,255,255,0.05)' }}
      >
        <h2 className="text-[16px] font-bold mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Contact Info
        </h2>

        <Field label="FULL NAME">{a.full_name}</Field>
        <Field label="EMAIL">
          <a href={`mailto:${a.email}`} style={{ color: '#f5f5f5', textDecoration: 'underline' }}>
            {a.email}
          </a>
        </Field>
        <Field label="PHONE">{a.phone}</Field>
        <Field label="WEBSITE / SOCIAL">{a.website_or_social}</Field>
      </section>

      <section
        className="rounded-[14px] p-7 border mt-6"
        style={{ background: '#141414', borderColor: 'rgba(255,255,255,0.05)' }}
      >
        <h2 className="text-[16px] font-bold mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Their Words
        </h2>

        <Field label="WHAT THEY LOVE ABOUT STARDUST GARAGE">{a.what_you_love}</Field>
        <Field label="WHAT THEY'D LIKE TO SEE MORE OF">{a.what_more}</Field>
      </section>
    </main>
  );
}
