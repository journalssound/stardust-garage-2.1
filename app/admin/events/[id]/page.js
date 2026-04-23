import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import EventForm from '../../components/EventForm';

export const revalidate = 0;

export default async function EditEventPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !event) {
    notFound();
  }

  return <EventForm event={event} />;
}
