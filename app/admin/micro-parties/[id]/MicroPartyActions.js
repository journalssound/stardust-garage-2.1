'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function MicroPartyActions({ inquiryId, currentStatus }) {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');

  const updateStatus = async (newStatus) => {
    setUpdating(true);
    setError('');
    const supabase = createClient();
    const { error: updateError } = await supabase
      .from('micro_party_inquiries')
      .update({ status: newStatus })
      .eq('id', inquiryId);

    if (updateError) {
      setError(updateError.message);
      setUpdating(false);
      return;
    }

    setUpdating(false);
    router.refresh();
  };

  const buttonBase =
    'px-5 py-2.5 rounded-full text-[12px] font-semibold tracking-[0.14em] transition-all hover:-translate-y-0.5 disabled:opacity-50';

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={updating || currentStatus === 'approved'}
          onClick={() => updateStatus('approved')}
          className={buttonBase}
          style={{
            background: currentStatus === 'approved' ? 'rgba(34,197,94,0.15)' : '#22c55e',
            color: currentStatus === 'approved' ? '#4ade80' : '#0a0a0a',
            border: '1px solid rgba(34,197,94,0.3)',
          }}
        >
          {currentStatus === 'approved' ? '✓ APPROVED' : 'APPROVE'}
        </button>

        <button
          type="button"
          disabled={updating || currentStatus === 'rejected'}
          onClick={() => updateStatus('rejected')}
          className={buttonBase}
          style={{
            background: currentStatus === 'rejected' ? 'rgba(239,68,68,0.15)' : 'transparent',
            color: currentStatus === 'rejected' ? '#f87171' : '#f5f5f5',
            border: '1px solid rgba(239,68,68,0.3)',
          }}
        >
          {currentStatus === 'rejected' ? '✗ REJECTED' : 'REJECT'}
        </button>

        {currentStatus !== 'pending' && (
          <button
            type="button"
            disabled={updating}
            onClick={() => updateStatus('pending')}
            className={buttonBase}
            style={{
              background: 'transparent',
              color: '#a0a0a0',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            RESET TO PENDING
          </button>
        )}
      </div>

      {error && (
        <div className="text-[13px] text-red-400 mt-3">
          {error}
        </div>
      )}
    </div>
  );
}
