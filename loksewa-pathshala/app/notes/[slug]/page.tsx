import { notFound } from 'next/navigation';
import { getNoteBySlug, notes } from '@/data/notes';
import { NoteReader } from '@/components/notes/NoteReader';

export function generateStaticParams(): Array<{ slug: string }> {
  return notes.map((note) => ({ slug: note.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const note = getNoteBySlug(params.slug);

  return {
    title: note ? `${note.titleNepali} | Notes` : 'Note',
    description: note?.summary ?? 'Loksewa note page.',
  };
}

export default function NotePage({ params }: { params: { slug: string } }): JSX.Element {
  const note = getNoteBySlug(params.slug);

  if (!note) {
    notFound();
  }

  return <NoteReader note={note} />;
}