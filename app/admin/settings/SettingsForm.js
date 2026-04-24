'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function SettingsForm({ initialSettings }) {
  const router = useRouter();
  const [logoUrl, setLogoUrl] = useState(initialSettings.logo_url || '');
  const [heroImage, setHeroImage] = useState(initialSettings.homepage_hero_image || '');
  const [heroDate, setHeroDate] = useState(initialSettings.homepage_hero_date || '');
  const [heroTitle, setHeroTitle] = useState(initialSettings.homepage_hero_title || '');
  const [cardCoworkImage, setCardCoworkImage] = useState(initialSettings.homepage_card_cowork_image || '');
  const [cardEventsImage, setCardEventsImage] = useState(initialSettings.homepage_card_events_image || '');
  const [cardStudioImage, setCardStudioImage] = useState(initialSettings.homepage_card_studio_image || '');

  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingCowork, setUploadingCowork] = useState(false);
  const [uploadingEvents, setUploadingEvents] = useState(false);
  const [uploadingStudio, setUploadingStudio] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const uploadFile = async (file, setLoading, setUrl) => {
    setError('');
    setLoading(true);
    const supabase = createClient();
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const { error: uploadError } = await supabase.storage
      .from('site-assets')
      .upload(fileName, file);

    if (uploadError) {
      setError('Upload failed: ' + uploadError.message);
      setLoading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('site-assets')
      .getPublicUrl(fileName);

    setUrl(publicUrl);
    setLoading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setSaving(true);

    const supabase = createClient();

    const updates = [
      { key: 'logo_url', value: logoUrl.trim() },
      { key: 'homepage_hero_image', value: heroImage.trim() },
      { key: 'homepage_hero_date', value: heroDate.trim() },
      { key: 'homepage_hero_title', value: heroTitle.trim() },
      { key: 'homepage_card_cowork_image', value: cardCoworkImage.trim() },
      { key: 'homepage_card_events_image', value: cardEventsImage.trim() },
      { key: 'homepage_card_studio_image', value: cardStudioImage.trim() },
    ];

    for (const upd of updates) {
      const { error: err } = await supabase
        .from('site_settings')
        .upsert(upd, { onConflict: 'key' });
      if (err) {
        setError('Save failed: ' + err.message);
        setSaving(false);
        return;
      }
    }

    setMessage('Settings saved.');
    setSaving(false);
    router.refresh();
  };

  const inputStyle = {
    background: '#141414',
    borderColor: 'rgba(255,255,255,0.1)',
    color: '#f5f5f5',
  };

  const labelClass = 'block text-[12px] font-semibold tracking-[0.14em] mb-2';
  const labelStyle = { color: '#8a8a8a' };
  const inputClass = 'w-full px-5 py-3.5 rounded-[10px] text-[14px] outline-none border transition-colors focus:border-white/30';

  const renderImageUploader = (label, value, setValue, loadingState, setLoadingState, aspectRatio = '4 / 5', helperText = null) => (
    <>
      {value && (
        <div className="mb-4 rounded-[10px] overflow-hidden border" style={{ borderColor: 'rgba(255,255,255,0.1)', aspectRatio }}>
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}
      <label className={labelClass} style={labelStyle}>{label}</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) uploadFile(file, setLoadingState, setValue);
        }}
        disabled={loadingState}
        className="text-[13px] file:mr-4 file:px-5 file:py-2.5 file:rounded-full file:border-0 file:text-[12px] file:font-semibold file:tracking-[0.12em] file:bg-white file:text-black file:cursor-pointer hover:file:bg-gray-200"
        style={{ color: '#8a8a8a' }}
      />
      {loadingState && <p className="text-[13px] mt-2" style={{ color: '#8a8a8a' }}>Uploading...</p>}
      <div className="mt-4">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Or paste an image URL"
          className={inputClass}
          style={inputStyle}
        />
      </div>
      {helperText && (
        <p className="text-[11px] mt-3" style={{ color: '#555' }}>{helperText}</p>
      )}
    </>
  );

  return (
    <form onSubmit={handleSave} className="space-y-10">
      {/* LOGO */}
      <section
        className="rounded-[14px] p-8 border"
        style={{ background: '#141414', borderColor: 'rgba(255,255,255,0.05)' }}
      >
        <h2 className="text-[18px] font-bold mb-5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Logo
        </h2>

        {logoUrl && (
          <div className="mb-4 p-6 rounded-[10px] flex items-center justify-center" style={{ background: '#0a0a0a', border: '1px dashed rgba(255,255,255,0.1)' }}>
            <img src={logoUrl} alt="Logo preview" className="h-12 w-auto object-contain" />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) uploadFile(file, setUploadingLogo, setLogoUrl);
          }}
          disabled={uploadingLogo}
          className="text-[13px] file:mr-4 file:px-5 file:py-2.5 file:rounded-full file:border-0 file:text-[12px] file:font-semibold file:tracking-[0.12em] file:bg-white file:text-black file:cursor-pointer hover:file:bg-gray-200"
          style={{ color: '#8a8a8a' }}
        />
        {uploadingLogo && <p className="text-[13px] mt-2" style={{ color: '#8a8a8a' }}>Uploading...</p>}

        <div className="mt-4">
          <input
            type="text"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            placeholder="Or paste an image URL"
            className={inputClass}
            style={inputStyle}
          />
        </div>

        {logoUrl && (
          <button
            type="button"
            onClick={() => setLogoUrl('')}
            className="mt-3 text-[12px] font-semibold tracking-[0.12em] hover:text-red-400 transition-colors"
            style={{ color: '#8a8a8a' }}
          >
            Remove logo (fall back to text)
          </button>
        )}

        <p className="text-[11px] mt-4" style={{ color: '#555' }}>
          Tip: use a transparent PNG or SVG. It displays at 55px height in the nav.
        </p>
      </section>

      {/* HOMEPAGE HERO */}
      <section
        className="rounded-[14px] p-8 border"
        style={{ background: '#141414', borderColor: 'rgba(255,255,255,0.05)' }}
      >
        <h2 className="text-[18px] font-bold mb-5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Homepage Hero
        </h2>

        {renderImageUploader('HERO IMAGE', heroImage, setHeroImage, uploadingHero, setUploadingHero, '16 / 7')}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div>
            <label className={labelClass} style={labelStyle}>HERO DATE (small text)</label>
            <input
              type="text"
              value={heroDate}
              onChange={(e) => setHeroDate(e.target.value)}
              placeholder="e.g. MAY 3, 2026"
              className={inputClass}
              style={inputStyle}
            />
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>HERO TITLE (large text)</label>
            <input
              type="text"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              placeholder="e.g. Basement Beats Showcase"
              className={inputClass}
              style={inputStyle}
            />
          </div>
        </div>
      </section>

      {/* HOMEPAGE CARDS */}
      <section
        className="rounded-[14px] p-8 border"
        style={{ background: '#141414', borderColor: 'rgba(255,255,255,0.05)' }}
      >
        <h2 className="text-[18px] font-bold mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Homepage Cards
        </h2>
        <p className="text-[13px] mb-6" style={{ color: '#8a8a8a' }}>
          The three large cards on the homepage that link to Cowork, Events, and Studio (coming soon).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-[14px] font-bold mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Cowork Card
            </h3>
            {renderImageUploader('COWORK CARD IMAGE', cardCoworkImage, setCardCoworkImage, uploadingCowork, setUploadingCowork, '4 / 5', 'Shown as a vertical card on the homepage.')}
          </div>
          <div>
            <h3 className="text-[14px] font-bold mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Events Card
            </h3>
            {renderImageUploader('EVENTS CARD IMAGE', cardEventsImage, setCardEventsImage, uploadingEvents, setUploadingEvents, '4 / 5', 'Shown as a vertical card on the homepage.')}
          </div>
          <div>
            <h3 className="text-[14px] font-bold mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Studio Card
            </h3>
            {renderImageUploader('STUDIO CARD IMAGE', cardStudioImage, setCardStudioImage, uploadingStudio, setUploadingStudio, '4 / 5', 'Shown as a vertical card with "Coming Soon" badge.')}
          </div>
        </div>
      </section>

      {error && (
        <div className="text-[13px] text-red-400 p-3 rounded-[10px] border border-red-500/30 bg-red-500/10">
          {error}
        </div>
      )}
      {message && (
        <div className="text-[13px] text-green-400 p-3 rounded-[10px] border border-green-500/30 bg-green-500/10">
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={saving || uploadingLogo || uploadingHero || uploadingCowork || uploadingEvents || uploadingStudio}
        className="w-full py-4 rounded-full text-[12px] font-semibold tracking-[0.16em] transition-all hover:-translate-y-0.5 disabled:opacity-50"
        style={{ background: '#ffffff', color: '#0a0a0a' }}
      >
        {saving ? 'SAVING...' : 'SAVE SETTINGS'}
      </button>
    </form>
  );
}
