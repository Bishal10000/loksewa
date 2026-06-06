import { notFound, redirect } from 'next/navigation';
import { getNoteBySlug } from '@/data/notes';
import { getSampleNoteRoute } from '@/lib/note-routing';

export default function NotePage({ params }: { params: { slug: string } }): JSX.Element {
  const note = getNoteBySlug(params.slug);

  if (!note) {
    notFound();
  }

  redirect(getSampleNoteRoute(note));
}