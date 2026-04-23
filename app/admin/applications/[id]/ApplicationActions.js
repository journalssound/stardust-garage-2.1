'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function ApplicationActions({ applicationId, currentStatus }) {
  const router = useRouter();
  const [working, setWorking] = useState(false);

  const updateStatus = async (newStatus) => {
    setWorking(true);
    const supabase = createClient();
    const { error } = await supabase
      .from('membership_applications')
      .update({ status: newStatus })
      .eq('id', applicationId);

    if (error) {
      alert('Error: ' + error.message);
      setWorking(false);
      return;
    }
    router.refresh();
    setWorking(false);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Permanently delete this application?');
    if (!confirmed) return;

    setWorking(true);
    const supabase = createClient();
    const { error } = await supabase
      .from('membership_applications')
      .delete()
      .eq('id', applicationId);

    if (error) {
      alert('Error: ' + error.message);
      setWorking(false);
      return;
    }
    router.push('/admin/applications');
    router.refresh();
  };

  return (
    <div className="flex flex-wrap gap-2">
      {currentStatus !== 'approved' && (
        <button
          onClick={() => updateStatus('approved')}
          disabled={working}
          className="px-5 py-2.5 rounded-full text-[12px] font-semibold tracking-[0.12em] transition-all hover:-translate-y-0.5 disabled:opacity-50"
          style={{ background: '#ffffff', color: '#0a0a0a' }}
        >
          APPROVE
        </button>
      )}
      {currentStatus !== 'rejected' && (
        <button
          onClick={() => updateStatus('rejected')}
          disabled={working}
          className="px-5 py-2.5 rounded-full text-[12px] font-semibold tracking-[0.12em] border transition-colors hover:bg-red-500/10 hover:border-red-500/40 disabled:opacity-50"
          style={{ borderColor: 'rgba(255,255,255,0.15)', color: '#f5f5f5' }}
        >
          REJECT
        </button>
      )}
      {currentStatus !== 'pending' && (
        <button
          onClick={() => updateStatus('pending')}
          disabled={working}
          className="px-5 py-2.5 rounded-full text-[12px] font-semibold tracking-[0.12em] border transition-colors hover:bg-white/5 disabled:opacity-50"
          style={{ borderColor: 'rgba(255,255,255,0.15)', color: '#f5f5f5' }}
        >
          MARK PENDING
        </button>
      )}
      <button
        onClick={handleDelete}
        disabled={working}
        className="ml-auto px-5 py-2.5 rounded-full text-[12px] font-semibold tracking-[0.12em] border transition-colors hover:bg-red-500/10 hover:border-red-500/40 disabled:opacity-50"
        style={{ borderColor: 'rgba(255,255,255,0.15)', color: '#f5f5f5' }}
      >
        DELETE
      </button>
    </div>
  );
}
