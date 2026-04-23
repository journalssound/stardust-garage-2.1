'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function GalleryManager({ galleryKey, label, description, initialImages }) {
  const router = useRouter();
  const [images, setImages] = useState(initialImages);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setError('');
    setUploading(true);

    const supabase = createClient();

    // Determine starting sort_order for new images
    const maxOrder = images.length > 0 ? Math.max(...images.map((i) => i.sort_order || 0)) : 0;

    for (let idx = 0; idx < files.length; idx++) {
      const file = files[idx];
      const fileName = `${galleryKey}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

      const { error: uploadError } = await supabase.storage
        .from('site-assets')
        .upload(fileName, file);

      if (uploadError) {
        setError('Upload failed: ' + uploadError.message);
        setUploading(false);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('site-assets')
        .getPublicUrl(fileName);

      const { data: newRow, error: insertError } = await supabase
        .from('gallery_images')
        .insert({
          gallery_key: galleryKey,
          image_url: publicUrl,
          sort_order: maxOrder + idx + 1,
        })
        .select()
        .single();

      if (insertError) {
        setError('DB insert failed: ' + insertError.message);
        setUploading(false);
        return;
      }

      setImages((prev) => [...prev, newRow]);
    }

    setUploading(false);
    // Clear the file input
    e.target.value = '';
    router.refresh();
  };

  const handleDelete = async (imageId) => {
    const confirmed = window.confirm('Remove this image from the gallery?');
    if (!confirmed) return;

    const supabase = createClient();
    const { error } = await supabase.from('gallery_images').delete().eq('id', imageId);

    if (error) {
      setError('Delete failed: ' + error.message);
      return;
    }

    setImages((prev) => prev.filter((img) => img.id !== imageId));
    router.refresh();
  };

  const moveImage = async (imageId, direction) => {
    const currentIndex = images.findIndex((img) => img.id === imageId);
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    if (targetIndex < 0 || targetIndex >= images.length) return;

    const supabase = createClient();

    const current = images[currentIndex];
    const target = images[targetIndex];

    // Swap sort_order values
    const updates = await Promise.all([
      supabase.from('gallery_images').update({ sort_order: target.sort_order }).eq('id', current.id),
      supabase.from('gallery_images').update({ sort_order: current.sort_order }).eq('id', target.id),
    ]);

    if (updates.some((u) => u.error)) {
      setError('Reorder failed.');
      return;
    }

    // Update local state
    const newImages = [...images];
    [newImages[currentIndex], newImages[targetIndex]] = [newImages[targetIndex], newImages[currentIndex]];
    newImages[currentIndex].sort_order = current.sort_order;
    newImages[targetIndex].sort_order = target.sort_order;
    setImages(newImages);
    router.refresh();
  };

  return (
    <section
      className="rounded-[14px] p-8 border"
      style={{ background: '#141414', borderColor: 'rgba(255,255,255,0.05)' }}
    >
      <h2 className="text-[18px] font-bold mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {label}
      </h2>
      <p className="text-[13px] mb-6" style={{ color: '#8a8a8a' }}>
        {description}
      </p>

      <div className="mb-6">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleUpload}
          disabled={uploading}
          className="text-[13px] file:mr-4 file:px-5 file:py-2.5 file:rounded-full file:border-0 file:text-[12px] file:font-semibold file:tracking-[0.12em] file:bg-white file:text-black file:cursor-pointer hover:file:bg-gray-200"
          style={{ color: '#8a8a8a' }}
        />
        {uploading && <p className="text-[13px] mt-2" style={{ color: '#8a8a8a' }}>Uploading...</p>}
        <p className="text-[11px] mt-2" style={{ color: '#555' }}>
          You can select multiple images at once.
        </p>
      </div>

      {images.length === 0 ? (
        <p className="text-[13px]" style={{ color: '#555' }}>No images yet. Upload one to get started.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {images.map((img, idx) => (
            <div
              key={img.id}
              className="relative rounded-[10px] overflow-hidden border"
              style={{ borderColor: 'rgba(255,255,255,0.1)', aspectRatio: '16 / 10' }}
            >
              <img src={img.image_url} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                <button
                  type="button"
                  onClick={() => moveImage(img.id, 'up')}
                  disabled={idx === 0}
                  className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center disabled:opacity-30 hover:bg-gray-200"
                  aria-label="Move up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveImage(img.id, 'down')}
                  disabled={idx === images.length - 1}
                  className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center disabled:opacity-30 hover:bg-gray-200"
                  aria-label="Move down"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(img.id)}
                  className="px-3 h-8 rounded-full text-[11px] font-semibold tracking-[0.12em] border hover:bg-red-500/20"
                  style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#f5f5f5' }}
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="mt-4 text-[13px] text-red-400 p-3 rounded-[10px] border border-red-500/30 bg-red-500/10">
          {error}
        </div>
      )}
    </section>
  );
}
