'use client';

import { useEffect, useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function EarlyMemberSplash({ logoUrl }) {
  const [soundOn, setSoundOn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState('splash'); // 'splash' | 'form' | 'thanks'
  const audioRef = useRef(null);

  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [websiteOrSocial, setWebsiteOrSocial] = useState('');
  const [whatYouLove, setWhatYouLove] = useState('');
  const [whatMore, setWhatMore] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;
    if (soundOn) {
      audioRef.current.pause();
      setSoundOn(false);
    } else {
      audioRef.current
        .play()
        .then(() => setSoundOn(true))
        .catch(() => {
          setSoundOn(false);
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim() || !email.trim()) {
      setError('Please provide at least your name and email.');
      return;
    }

    setSubmitting(true);

    const supabase = createClient();
    const { error: insertError } = await supabase
      .from('early_member_applications')
      .insert({
        full_name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        website_or_social: websiteOrSocial.trim() || null,
        what_you_love: whatYouLove.trim() || null,
        what_more: whatMore.trim() || null,
      });

    if (insertError) {
      setError('Something went wrong: ' + insertError.message);
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    setView('thanks');
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    borderColor: 'rgba(255,255,255,0.15)',
    color: '#f5f5f5',
  };
  const inputClass =
    'w-full px-5 py-3.5 rounded-[10px] text-[14px] outline-none border transition-colors focus:border-white/40';
  const labelClass = 'block text-[12px] font-semibold tracking-[0.14em] mb-2';
  const labelStyle = { color: '#a0a0a0' };

  // ===== THANK YOU SCREEN =====
  if (view === 'thanks') {
    return (
      <main className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16">
        <div className="text-center max-w-[520px]">
          <div className="text-[11px] font-semibold tracking-[0.24em] text-white/60 mb-6">
            APPLICATION RECEIVED
          </div>
          <h1
            className="text-[40px] md:text-[56px] leading-[1] text-white mb-8"
            style={{
              fontFamily: "'Moshra Aesthetic', 'Cormorant Unicase', serif",
              fontWeight: 400,
            }}
          >
            Thank you.
          </h1>
          <p
            className="text-[16px] md:text-[18px] italic text-white/85 leading-[1.6]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            We&apos;ll be in touch soon.
          </p>
        </div>
      </main>
    );
  }

  // ===== APPLICATION FORM =====
  if (view === 'form') {
    return (
      <main className="relative min-h-screen flex flex-col items-center px-6 py-12 md:py-16">
        <div className="w-full max-w-[560px]">
          <button
            type="button"
            onClick={() => setView('splash')}
            className="text-[11px] font-semibold tracking-[0.2em] text-white/50 hover:text-white transition-colors mb-8"
          >
            ← BACK
          </button>

          <div className="text-center mb-10">
            <div className="text-[11px] font-semibold tracking-[0.24em] text-white/60 mb-4">
              EARLY MEMBERSHIP
            </div>
            <h1
              className="text-[40px] md:text-[56px] leading-[1] text-white mb-4"
              style={{
                fontFamily: "'Moshra Aesthetic', 'Cormorant Unicase', serif",
                fontWeight: 400,
              }}
            >
              Apply
            </h1>
            <p
              className="text-[15px] md:text-[16px] italic text-white/70 leading-[1.6] max-w-[420px] mx-auto"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Tell us about yourself and what draws you in.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={labelClass} style={labelStyle}>FULL NAME *</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className={inputClass}
                style={inputStyle}
              />
            </div>

            <div>
              <label className={labelClass} style={labelStyle}>EMAIL *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputClass}
                style={inputStyle}
              />
            </div>

            <div>
              <label className={labelClass} style={labelStyle}>PHONE NUMBER</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
                style={inputStyle}
              />
            </div>

            <div>
              <label className={labelClass} style={labelStyle}>WEBSITE / SOCIAL MEDIA</label>
              <input
                type="text"
                value={websiteOrSocial}
                onChange={(e) => setWebsiteOrSocial(e.target.value)}
                placeholder="instagram.com/yourname or yourwebsite.com"
                className={inputClass}
                style={inputStyle}
              />
            </div>

            <div>
              <label className={labelClass} style={labelStyle}>WHAT DO YOU LOVE ABOUT STARDUST GARAGE?</label>
              <textarea
                value={whatYouLove}
                onChange={(e) => setWhatYouLove(e.target.value)}
                rows={4}
                className={inputClass}
                style={{ ...inputStyle, resize: 'vertical', minHeight: '110px' }}
              />
            </div>

            <div>
              <label className={labelClass} style={labelStyle}>WHAT WOULD YOU LIKE TO SEE MORE OF IN THE FUTURE?</label>
              <textarea
                value={whatMore}
                onChange={(e) => setWhatMore(e.target.value)}
                rows={4}
                className={inputClass}
                style={{ ...inputStyle, resize: 'vertical', minHeight: '110px' }}
              />
            </div>

            {error && (
              <div className="text-[13px] text-red-400 p-3 rounded-[10px] border border-red-500/30 bg-red-500/10">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-full text-[12px] font-semibold tracking-[0.2em] transition-all hover:-translate-y-0.5 disabled:opacity-50"
              style={{ background: '#ffffff', color: '#0a0a0a' }}
            >
              {submitting ? 'SUBMITTING...' : 'SUBMIT APPLICATION'}
            </button>
          </form>
        </div>
      </main>
    );
  }

  // ===== SPLASH SCREEN (default) =====
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-12 md:pt-20 pb-16">
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sdg-bg-track-nmh3bc3xxpb3RhJXNTPJfyOFzXEBFq.mp3"
      />

      <div className="flex flex-col items-center -mt-12 md:-mt-20">
        {/* WORDMARK */}
        <div className="flex flex-col items-center mb-8 md:mb-10">
          <h1
            className="text-[64px] md:text-[110px] leading-[0.9] tracking-[0.02em] text-white text-center"
            style={{
              fontFamily: "'Moshra Aesthetic', 'Cormorant Unicase', serif",
              fontWeight: 400,
            }}
          >
            STARDUST
          </h1>
          <div
            className="text-[28px] md:text-[44px] tracking-[0.32em] text-white mt-1 md:mt-2"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
            }}
          >
            GARAGE
          </div>
        </div>

        {/* FLOATING LOGO */}
        <div
          className="block mb-7 md:mb-8"
          style={{
            animation: mounted ? 'float-logo 4s ease-in-out infinite' : 'none',
          }}
        >
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="Stardust Garage"
              className="w-[120px] md:w-[150px] h-auto"
              style={{
                filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.15))',
              }}
            />
          ) : (
            <div
              className="w-[120px] md:w-[150px] h-[150px] md:h-[190px] rounded-[14px] flex items-center justify-center text-center px-4"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px dashed rgba(255,255,255,0.2)' }}
            >
              <span className="text-[10px] tracking-[0.2em] text-white/40">UPLOAD SPLASH LOGO IN ADMIN</span>
            </div>
          )}
        </div>

        {/* APPLY FOR MEMBERSHIP BUTTON */}
        <button
          type="button"
          onClick={() => setView('form')}
          className="mt-2 px-9 py-3.5 rounded-full text-[12px] font-semibold tracking-[0.2em] transition-all hover:-translate-y-0.5"
          style={{ background: '#ffffff', color: '#0a0a0a' }}
        >
          APPLY FOR MEMBERSHIP
        </button>
      </div>

      {/* SOUND TOGGLE */}
      <button
        onClick={toggleSound}
        className="absolute bottom-6 left-6 md:bottom-8 md:left-8 flex items-center gap-2.5 text-[12px] tracking-[0.16em] text-white/60 hover:text-white transition-colors"
        style={{ fontFamily: "'Inter', sans-serif" }}
        aria-label={soundOn ? 'Mute sound' : 'Play sound'}
      >
        <span
          className="inline-block w-2 h-2 rounded-full"
          style={{
            background: soundOn ? '#f5f5f5' : 'rgba(255,255,255,0.3)',
            boxShadow: soundOn ? '0 0 10px rgba(255,255,255,0.6)' : 'none',
            transition: 'all 0.2s ease',
          }}
        />
        {soundOn ? 'SOUND ON' : 'SOUND OFF'}
      </button>

      <style jsx>{`
        @keyframes float-logo {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }
      `}</style>
    </main>
  );
}
